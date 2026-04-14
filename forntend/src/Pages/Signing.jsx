import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from '../Context/AppContext';
//import OAuth from '../Components/OAuth';


const Signing = () => {
  const navigate = useNavigate();

  const { setCurrentUser } = useAppContext(); // ✅ isticmaalo context

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // handle change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      // validation
      if (!formData.email || !formData.password) {
        toast.error("Please fill all the fields");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid JSON from server");
      }

      if (!res.ok) {
        setError(data.message);
        toast.error(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ SAVE USER (IMPORTANT)
      setCurrentUser(data.user); // backend waa inuu soo diraa user

      toast.success("Login successful");

      navigate("/profile"); // redirect home

      setFormData({
        email: '',
        password: ''
      });

    } catch (err) {
      console.log(err);
      toast.error(err.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input
          value={formData.email}
          onChange={handleChange}
          className='border p-3 rounded-lg'
          type='email'
          placeholder='Email'
          id='email'
        />

        <input
          value={formData.password}
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
          {loading ? "Loading..." : "Sign In"}
        </button>
        {/*<OAuth />*/}
      </form>

      {error && (
        <p className='text-red-500 mt-3'>{error}</p>
      )}

      <div className='mt-4'>
        <span>Don't have an account? </span>
        <Link to="/sign-up">
          <span className='text-blue-700'>Sign Up</span>
        </Link>
         
      </div>
     

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Signing;