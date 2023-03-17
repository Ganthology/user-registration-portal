import { TextInput, Textarea } from '@mantine/core';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
  const auth = useAuthStore((state) => state.auth);

  const setAuth = useAuthStore((state) => state.setAuth);

  const navigate = useNavigate();

  return (
    <div className="Container">
      <div className="flex flex-col items-center bg-white w-4/5 sm:w-2/3 md:w-1/3 px-8 py-8 rounded-xl shadow-lg space-y-4">
        <h1 className="font-bold text-blue-600 text-2xl">Preview Submission</h1>
        <div className="text-left w-full">
          <TextInput label="Email" value={auth?.user.email} readOnly />
          <TextInput label="Full Name" value={auth?.user.fullName} readOnly />
          <Textarea label="Address" value={auth?.user.address} readOnly />
          <TextInput label="Age" type="number" value={auth?.user.age} readOnly />
          <TextInput label="Employment" value={auth?.user.employment} readOnly />
          <TextInput label="Job" value={auth?.user.job} readOnly />
          <TextInput label="Verification Method" value={auth?.user.imageType} readOnly />
          <div key={auth?.user.imageFront} className="flex justify-center items-center">
            <img className="w-36" src={auth?.user.imageFront} alt={'image'} />
          </div>
          <div key={auth?.user.imageBack} className="flex justify-center items-center">
            <img className="w-36" src={auth?.user.imageBack} alt={'image'} />
          </div>
        </div>
        <button
          className="Button"
          onClick={() => {
            setAuth(null);
            navigate('/');
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
