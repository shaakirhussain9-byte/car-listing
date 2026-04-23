import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";


const SignIn = () => {
  const {
    currentUser,
    signInStart,
    signInFailure,
    signInSuccess,
    loading,
    error,
  } = useAppContext();
  const navigate = useNavigate();
  // states

  const [formData, setFormData] = useState({});

  // function to manage changes of the input elements
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      signInStart();

      // let's check form data first
      if (!(formData.password && formData.email)) {
        toast.error("Please fill all the fields");

        return; // retn  from the submission
      }

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        signInFailure(data.message);
        toast.error("Login failed");
        return;
      }
      signInSuccess(data);
      navigate("/");
    } catch (error) {
      toast.error("Login failed");
      signInFailure(error.message);
    }
  };

  currentUser && console.log(currentUser);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={handleChange}
          className="border p-3 rounded-lg"
          type="email"
          placeholder="email"
          id="email"
        />
        <input
          onChange={handleChange}
          className="border p-3 rounded-lg"
          type="password"
          placeholder="password"
          id="password"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Sign In
        </button>{" "}
  
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;