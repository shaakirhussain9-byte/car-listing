import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const SignUp = () => {

  // states
  const [formData, setFormData] = useState({});

  // handle change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

   console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/SignUp",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(formData)
      })
      const data =  await res.json()
      if(data.success===false)
      {
        return
      }
      
    } catch (error) {
      console.log(error);
      
    }
   
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          onChange={handleChange}
          className='border p-3 rounded-lg'
          type='text'
          placeholder='username'
          id='username'
        />

        <input
          onChange={handleChange}
          className='border p-3 rounded-lg'
          type='email'
          placeholder='Email'
          id='email'
        />

        <input
          onChange={handleChange}
          className='border p-3 rounded-lg'
          type='password'
          placeholder='Password'
          id='password'
        />

        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-90'>
          Sign Up
        </button>
      </form>

      <div className='mt-4'>
        <span>Have an account? </span>
        <Link to="/Signing">
          <span className='text-blue-700'>Sign-In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;