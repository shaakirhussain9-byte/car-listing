import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaShare } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { IoLogoModelS } from "react-icons/io";
import { MdCalendarMonth } from "react-icons/md";
import { BsFillFuelPumpFill, BsSpeedometer } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import { useAppContext } from "../Context/AppContext";
import Contact from "../Components/Contact";

const Listing = () => {
  const { listingId } = useParams();
  const { currentUser } = useAppContext();

  SwiperCore.use([Navigation]);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch");
        }

        setListing(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Copied successfully");
  };

  return (
    <main>
      {loading && (
        <p className="text-center my-7 text-3xl">Loading...</p>
      )}

      {error && (
        <p className="text-center my-7 text-3xl text-red-500">
          Something went wrong
        </p>
      )}

      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageURLs?.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[75vh]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Share button */}
          <div className="fixed top-[13%] z-10 right-[3%] border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              onClick={handleShare}
              className="text-slate-500"
            />
          </div>

          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name} ${" "}
              {listing.offer
                ? listing.discountPrice
                : listing.regularPrice?.toLocaleString("en-US")}
              {listing.type === "rent" && " /month"}
            </p>

            <p className="flex items-center mt-6 gap-2 text-slate-600 text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.location}
            </p>

            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>

              {listing.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  Save: $
                  {listing.regularPrice - listing.discountPrice}
                </p>
              )}
            </div>

            <div>
              <span className="font-semibold text-black">
                Description -
              </span>
              {listing.description}
            </div>

            <hr />

            <ul className="flex flex-wrap items-center gap-4 sm:gap-6 mt-2">
              <li className="flex items-center gap-1">
                <IoLogoModelS />
                Model: {listing.model}
              </li>

              <li className="flex items-center gap-1">
                <MdCalendarMonth />
                Year: {listing.year}
              </li>

              <li className="flex items-center gap-1">
                <BsSpeedometer />
                Mileage: {listing.mileage}
              </li>

              <li className="flex items-center gap-1">
                <BsFillFuelPumpFill />
                Fuel: {listing.fuelType}
              </li>

              <li className="flex items-center gap-1">
                <GiGearStickPattern />
                Transmission: {listing.transmission}
              </li>
            </ul>

            {currentUser &&
              currentUser._id !== listing.sellerRef &&
              !contact && (
                <button
                  onClick={() => setContact(true)}
                  className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90"
                >
                  Contact The Owner
                </button>
              )}

            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}

      <ToastContainer />
    </main>
  );
};

export default Listing;
