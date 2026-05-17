import { useAppContext } from "../Context/AppContext";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const Profile = () => {
  const fileRef = useRef(null);
  const {
    currentUser,
    loading,
    error,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signoutUserStart,
    signoutUserSuccess,
    signoutUserFailure,
  } = useAppContext();

  const [imageURL, setImageURL] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [imageLoading, setImageLoading] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  // function to handle when image is uploaded
  const handleFileChange = async (e) => {
    setImageLoading(true);
    const file = e.target.files[0];

    if (!file) {
      setImageLoading(false);
      return;
    }
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "car_listing_site");
    data.append("api_key", import.meta.env.CLOUDINARY_API_KEY);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dkmpqqo5s/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const uploadedImage = await res.json();
    setImageURL(uploadedImage.url);
    setUpdatedData((prev) => ({ ...prev, avatar: uploadedImage.url }));
    setImageLoading(false);
  };

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      updateUserStart();
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (!data) {
        updateUserFailure(data.message);
        toast.error("Failed to update ");
        return;
      }

      updateUserSuccess(data);
      toast.success("Profile updated successfully");
    } catch (error) {
      updateUserFailure(error.message);
      toast.error("failed to update");
    }
  };

  imageLoading && toast.success("Image is uploading");

  const handleDelete = async () => {
    try {
      deleteUserStart();
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) {
        deleteUserFailure(data.message);
        toast.error("Failed to delete account");
        return;
      }
      deleteUserSuccess();
      toast.success("Account deleted successfully");
    } catch (error) {
      deleteUserFailure(error.message);
      toast.error("Failed to delete account");
    }
  };

  const handleSignOut = async () => {
    try {
      signoutUserStart();
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      if (!data.success) {
        signoutUserFailure(data.message);
        toast.error("Failed to sign out");
        return;
      }

      signoutUserSuccess();

      return;
    } catch (error) {
      signoutUserFailure(error.message);
      toast.error("Failed to sign out");
    }
  };

  const handleShowListing = async () => {
    try {
      setShowListingError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (!data) {
        setShowListingError(true);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data) {
        return;
      }
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
      toast.success("Listing deleted successfully");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input onChange={handleFileChange} type="file" ref={fileRef} hidden />
        <img
          onClick={() => fileRef.current.click()}
          className="h-24 w-24 rounded-full cursor-pointer object-cover self-center mt-2"
          src={imageURL ? imageURL : currentUser.avatar}
          alt="profile image"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="username"
          id="username"
          className="rounded-lg p-3 border"
          defaultValue={currentUser.username}
        />
        <input
          onChange={handleChange}
          type="email"
          placeholder="email"
          id="email"
          className="rounded-lg p-3 border"
          defaultValue={currentUser.email}
        />
        <input
          onChange={handleChange}
          type="password"
          placeholder="password"
          id="password"
          className="rounded-lg p-3 border"
        />
        <button
          disabled={loading || imageLoading}
          className="uppercase bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80"
        >
          update
        </button>
        <Link
          to="/create-listing"
          className="uppercase bg-green-700 text-center text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80"
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer">
          Delete account
        </span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>
      <button onClick={handleShowListing} className="text-green-700 w-full">
        Show Listings
      </button>
      <p>{showListingError ? "There is error for showing lists" : ""}</p>
      {userListings && userListings.length > 0 && (
        <div>
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
              key={listing._id}
            >
              <Link className="flex-1" to={`/listing/${listing._id}`}>
                <img
                  className="h-16 w-16 object-contain"
                  src={listing.imageURLs[0]}
                  alt=""
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold hover:underline hover:cursor-pointer truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p className="text-right">{listing.name}</p>
              </Link>
              <div className="flex flex-col  items-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Profile;
