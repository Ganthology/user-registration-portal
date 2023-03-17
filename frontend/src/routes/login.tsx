import { PasswordInput, TextInput } from '@mantine/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuthStore } from '../store/useAuthStore';
import { AuthData, Role } from '../types';
import { redirect, useNavigate } from 'react-router-dom';

type LoginInput = {
  email: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInput>();

  const auth = useAuthStore((state) => state.auth);
  const setAuth = useAuthStore((state) => state.setAuth);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginInput> = async (data: { email: string; password: string }) => {
    const { email, password } = data;

    try {
      const res: Response = await fetch('http://localhost:3333/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.ok) {
        const { access_token, user }: AuthData = await res.json();
        setAuth({
          access_token,
          user,
        });

        if (user.role === Role.ADMIN) navigate('/user/list');

        if (user.role === Role.USER) navigate('/user/profile');
      }
    } catch (error) {
      // console.log(error);
      return;
    }
  };

  return (
    <div className="Container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center bg-white px-8 py-8 rounded-xl shadow-lg space-y-4"
      >
        <h1 className="font-bold text-blue-600 text-2xl">User Registration Portal</h1>
        <div className="text-left w-full">
          <TextInput label="Email" error={errors.email?.message} {...register('email')} />
          <PasswordInput label="Password" {...register('password')} />
        </div>
        <div className="flex flex-row my-auto space-x-2">
          <button className="bg-blue-600 px-8 py-2 rounded-full text-white font-semibold shadow-md">Login</button>
        </div>
        <span className="text-sm font-medium">
          Not a user yet?{' '}
          <span
            className="underline text-blue-600 hover:text-blue-400 cursor-pointer"
            onClick={() => navigate('/register')}
          >
            Register here
          </span>
        </span>
      </form>
    </div>
  );
}

export default Login;
