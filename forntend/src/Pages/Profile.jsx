import { useAppContext } from "../Context/AppContext";
import { useRef, useState } from "react";

const Profile = () => {
  const fileRef = useRef(null);
  const { currentUser } = useAppContext();
  const [imageURL, setImageURL] = useState(null);

  // function to handle when image is uploaded
  const handlefileChange = async (e) => {
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
  };

  console.log(imageURL);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Profile
      </h1>

      <form className="flex flex-col gap-4">
        <input
          onChange={handlefileChange}
          type="file"
          ref={fileRef}
          hidden
        />

        <img
          onClick={() => fileRef.current.click()}
          src={imageURL || currentUser?.avatar}
          alt="profile image"
          className="h-24 w-24 rounded-full cursor-pointer object-cover self-center mt-2"
        />

        <input
          type="text"
          placeholder="username"
          id="username"
          className="rounded-lg p-3 border"
          defaultValue={currentUser?.username}
        />

        <input
          type="text"
          placeholder="Email"
          id="email"
          className="rounded-lg p-3 border"
          defaultValue={currentUser?.email}
        />

        <input
          type="password"
          placeholder="password"
          id="password"
          className="rounded-lg p-3 border"
        />

        <button className="uppercase bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-50">
          Update
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
    </div>
  );
};

export default Profile;