// a component that automatically sends the user to the företagsanmälan page on load
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { set } from 'zod';



export default function SignUp(){
  const router = useRouter();

  useEffect(() => {
    router.push('/företagsanmälan');
  }, []);

  return (
    <div className="pt-[200px] pb-[200px] flex flex-row items-center justify-center">
    <h1 className='text-2xl text-white'>Redirecting...</h1>
    </div>
  );
};


