import { useAppContext } from "../Context/AppContext";
import { useRef, useState } from "react";

const Profile = () => {
  const fileRef = useRef(null);
  const {
    currentUser,
    loading,
    error,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
  } = useAppContext();

  const [imageURL, setImageURL] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  // upload image
  const handlefileChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "Card List");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dtx2xinlj/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const uploadedImageURL = await res.json();

      setImageURL(uploadedImageURL.secure_url);

      setUpdatedData((prev) => ({
        ...prev,
        avatar: uploadedImageURL.secure_url,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // input change
  const handleChange = (e) => {
    setUpdatedData({
      ...updatedData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      updateUserStart();

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData), // ✔ fix
      });

      const data = await res.json();

      if (!data.success) { // ✔ fix
        updateUserFailure(data.message);
        return;
      }

      updateUserSuccess(data);
    } catch (error) {
      updateUserFailure(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Profile
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={handlefileChange}
          type="file"
          ref={fileRef}
          hidden
        />

        <img
          onClick={() => fileRef.current.click()}
          src={imageURL || currentUser?.avatar}
          alt="profile"
          className="h-24 w-24 rounded-full cursor-pointer object-cover self-center mt-2"
        />

        <input
          onChange={handleChange}
          type="text"
          placeholder="username"
          id="username"
          className="rounded-lg p-3 border"
          defaultValue={currentUser?.username}
        />

        <input
          onChange={handleChange}
          type="text"
          placeholder="Email"
          id="email"
          className="rounded-lg p-3 border"
          defaultValue={currentUser?.email}
        />

        <input
          onChange={handleChange}
          type="password"
          placeholder="password"
          id="password"
          className="rounded-lg p-3 border"
        />

        <button
          disabled={loading}
          className="uppercase bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">
          Delete account
        </span>
        <span className="text-red-700 cursor-pointer">
          Sign Out
        </span>
      </div>

      {error && (
        <p className="text-red-500 mt-3">{error}</p>
      )}
    </div>
  );
};

export default Profile;