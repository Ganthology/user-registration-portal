import { PasswordInput, TextInput, Textarea, Stepper, Radio, FileButton, Divider } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useFormStore } from '../store/useFormStore';
import { useState } from 'react';
import { ImageType } from '../types';

type LoginInput = {
  email: string;
  password: string;
  fullName: string;
  age: string;
  address: string;
  employment: string;
  job: string;
};

function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInput>();

  const navigate = useNavigate();

  const formData = useFormStore((state) => state.formData);

  const setFormData = useFormStore((state) => state.setFormData);

  const [step, setStep] = useState(0);

  const [frontImage, setFrontImage] = useState<File | null>(null);

  const [backImage, setBackImage] = useState<File | null>(null);

  const [verificationMethod, setVerificationMethod] = useState('passport');

  const submitDetail: SubmitHandler<LoginInput> = async (data) => {
    const { email, password, fullName, age, address, employment, job } = data;

    setFormData({
      email,
      password,
      fullName,
      age,
      address,
      employment,
      job,
    });

    setStep(1);
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return await fetch('http://localhost:3333/api/s3/upload', {
      method: 'POST',
      body: formData,
    }).then((res) => res.json());
  };

  const submitUpload = async () => {
    if (verificationMethod === 'passport') {
      await handleUpload(frontImage!).then((res) => {
        setFormData({
          ...formData,
          imageFront: res.url,
          imageType: ImageType.PASSPORT,
        });
      });
      setStep(2);
    } else if (verificationMethod === 'ic') {
      const frontRes = await handleUpload(frontImage!).then((res) => {
        return res;
      });
      const backRes = await handleUpload(backImage!).then((res) => {
        return res;
      });
      setFormData({
        ...formData,
        imageFront: frontRes.url,
        imageBack: backRes.url,
        imageType: ImageType.NATIONAL_IDENTITY_CARD,
      });
      setStep(2);
    }
  };

  const submitRegistration = async () => {
    await fetch('http://localhost:3333/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        age: formData?.age ? +formData.age : 0,
      }),
    }).then(() => setStep(3));
  };

  return (
    <div className="App bg-blue-100 w-screen h-screen flex flex-row items-center justify-center">
      {step === 0 && (
        <form
          onSubmit={handleSubmit(submitDetail)}
          className="flex flex-col items-center bg-white w-4/5 sm:w-2/3 md:w-1/3 px-8 py-8 rounded-xl shadow-lg space-y-4"
        >
          <div>
            <h1 className="font-bold text-blue-600 text-2xl">New User Registration</h1>
          </div>
          <div className="text-left w-full">
            <TextInput label="Email" error={errors.email?.message} {...register('email')} />
            <PasswordInput label="Password" {...register('password')} />
            <TextInput label="Full Name" error={errors.fullName?.message} {...register('fullName')} />
            <Textarea label="Address" error={errors.address?.message} {...register('address')} />
            <TextInput label="Age" type="number" error={errors.age?.message} {...register('age')} />
            <TextInput label="Employment" error={errors.employment?.message} {...register('employment')} />
            <TextInput label="Job" error={errors.job?.message} {...register('job')} />
          </div>
          <div className="flex flex-row my-auto space-x-2">
            <button className="Button">Submit</button>
          </div>
          <span className="text-sm font-medium">
            Already have an account?{' '}
            <span className="underline text-blue-600 hover:text-blue-400 cursor-pointer" onClick={() => navigate('/')}>
              Login now
            </span>
          </span>
        </form>
      )}
      {step === 1 && (
        <div className="flex flex-col items-center bg-white w-4/5 sm:w-2/3 md:w-1/3 px-8 py-8 rounded-xl shadow-lg space-y-4">
          <h1 className="font-bold text-blue-600 text-2xl">Upload Documents</h1>
          <Radio.Group
            name="method"
            label="Verification Method"
            className="w-full space-y-2"
            value={verificationMethod}
            onChange={setVerificationMethod}
            withAsterisk
          >
            <Radio value="passport" label="Passport" />
            <Radio value="ic" label="National Identification Card" />
          </Radio.Group>
          {verificationMethod === 'passport' ? (
            <>
              <FileButton onChange={setFrontImage} accept="image/png,image/jpeg">
                {(props) => (
                  <button className="Button" {...props}>
                    Upload Image
                  </button>
                )}
              </FileButton>
              {frontImage && (
                <div key={frontImage.name} className="flex justify-center items-center">
                  <img className="w-36" src={URL.createObjectURL(frontImage)} alt={frontImage.name} />
                </div>
              )}
            </>
          ) : (
            <div className="grid sm:grid-cols-2 w-full">
              <div className="flex flex-col items-center space-y-2">
                <FileButton onChange={setFrontImage} accept="image/png,image/jpeg">
                  {(props) => (
                    <button className="Button" {...props}>
                      Upload Front
                    </button>
                  )}
                </FileButton>
                {frontImage && (
                  <div key={frontImage.name} className="flex justify-center items-center">
                    <img className="w-36" src={URL.createObjectURL(frontImage)} alt={frontImage.name} />
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center space-y-2">
                <FileButton onChange={setBackImage} accept="image/png,image/jpeg">
                  {(props) => (
                    <button className="Button" {...props}>
                      Upload Back
                    </button>
                  )}
                </FileButton>
                {backImage && (
                  <div key={backImage.name} className="flex justify-center items-center">
                    <img className="w-36" src={URL.createObjectURL(backImage)} alt={backImage.name} />
                  </div>
                )}
              </div>
            </div>
          )}
          <Divider />
          <button className="Button" onClick={submitUpload}>
            Submit
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col items-center bg-white w-4/5 sm:w-2/3 md:w-1/3 px-8 py-8 rounded-xl shadow-lg space-y-4">
          <h1 className="font-bold text-blue-600 text-2xl">Preview Submission</h1>
          <div className="text-left w-full">
            <TextInput label="Email" value={formData?.email} readOnly />
            <PasswordInput label="Password" value={formData?.password} readOnly />
            <TextInput label="Full Name" value={formData?.fullName} readOnly />
            <Textarea label="Address" value={formData?.address} readOnly />
            <TextInput label="Age" type="number" value={formData?.age} readOnly />
            <TextInput label="Employment" value={formData?.employment} readOnly />
            <TextInput label="Job" value={formData?.job} readOnly />
            <TextInput label="Verification Method" value={formData?.imageType} readOnly />
            <div key={formData?.imageFront} className="flex justify-center items-center">
              <img className="w-36" src={formData?.imageFront} alt={'image'} />
            </div>
            <div key={formData?.imageBack} className="flex justify-center items-center">
              <img className="w-36" src={formData?.imageBack} alt={'image'} />
            </div>
          </div>

          <button className="Button" onClick={submitRegistration}>
            Submit
          </button>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col items-center bg-white w-4/5 sm:w-2/3 md:w-1/3 px-8 py-8 rounded-xl shadow-lg space-y-4">
          <h1 className="font-bold text-blue-600 text-2xl">Registration Successful</h1>
          <span onClick={() => navigate('/')} className="underline text-blue-600 hover:text-blue-400 cursor-pointer">
            Return to Homepage
          </span>
        </div>
      )}
    </div>
  );
}

export default Register;
