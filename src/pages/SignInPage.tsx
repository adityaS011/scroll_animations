import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { GoogleLogo } from '../icon';
import { auth } from '../services/firebase';

const SignInPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigate('/dashboard');
  };

  return (
    <div
      className='flex flex-col pt-24 gap-12 items-center h-screen bg-[#111111] '
      style={{
        background:
          'radial-gradient(circle at center 200px, #22095aee 0.1%, #111111 35%)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div>
        <img src='speaker.svg' alt='speaker.svg' />
      </div>

      <div className='flex flex-col gap-9 items-center'>
        <div className='text-4xl text-[#FFFFFF] font-bold leading-[1] text-center'>
          Access <br />
          rate alert dashboard
        </div>
        <p className='text-[#ffffff94]  font-medium leading-[1] text-center'>
          Stay updated with real-time currency rates and <br /> manage your
          alerts.
        </p>
      </div>
      <button
        className='bg-[#333333] rounded-[28px] py-[17px] flex flex-row gap-[10px] w-[353px] justify-center hover:bg-[#272727] text-white px-[19px] '
        onClick={handleGoogleSignIn}
      >
        <GoogleLogo />
        <p className='font-semibold'>Sign in with Google</p>
      </button>
      <div>
        <p className='text-[#ffffffbd] text-center text-sm'>
          By creating an account or signing you <br /> agree to our{' '}
          <span className='underline font-semibold text-[#ffffff] cursor-pointer'>
            Terms and Conditions{' '}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
