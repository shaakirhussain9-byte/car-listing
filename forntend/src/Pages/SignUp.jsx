import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // ✅ added

  // handle change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      // validation
      if (!formData.username || !formData.email || !formData.password) {
        toast.error("Please fill all the fields");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        toast.error(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      toast.success("Registration successful");

      setLoading(false);

      // ✅ redirect after success
      navigate("/Signing");

    } catch (error) {
      console.log(error);
      toast.error("Server error");
      setLoading(false);
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
          placeholder='Username'
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

        <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase disabled:opacity-50'
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>

      {error && (
        <p className='text-red-500 mt-3'>{error}</p>
      )}

      <div className='mt-4'>
        <span>Have an account? </span>
        <Link to="/Signing">
          <span className='text-blue-700'>Sign-In</span>
        </Link>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SignUp;