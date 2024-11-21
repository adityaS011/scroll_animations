import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import Navbar from '../components/Navbar';
import { auth } from '../services/firebase';
import Dashboard from './Dashboard';

const RateAlertPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleGoogleSignIn = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  if (!user) {
    return (
      <div className='w-full h-screen flex flex-col items-center justify-center bg-[#111111]'>
        <Navbar />
        <button
          className='bg-blue-500 text-white py-2 px-4 rounded'
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </button>
      </div>
    );
  }

  return <Dashboard />;
};

export default RateAlertPage;
