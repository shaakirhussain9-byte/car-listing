import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useEffect, useState } from "react";
import ListingItem from "../components/ListingItem";

SwiperCore.use([Navigation]);

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);

  // ✅ Loading states
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [loadingRent, setLoadingRent] = useState(true);
  const [loadingSale, setLoadingSale] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const [offerRes, rentRes, saleRes] = await Promise.all([
          fetch(`/api/listing/get?offer=true&limit=3`),
          fetch(`/api/listing/get?type=rent&limit=3`),
          fetch(`/api/listing/get?type=sale&limit=3`),
        ]);

        const [offerData, rentData, saleData] = await Promise.all([
          offerRes.json(),
          rentRes.json(),
          saleRes.json(),
        ]);

        setOfferListings(offerData);
        setRentListings(rentData);
        setSaleListings(saleData);
      } catch (error) {
        console.log(error);
      } finally {
        // ✅ stop loading after fetch completes
        setLoadingOffers(false);
        setLoadingRent(false);
        setLoadingSale(false);
      }
    };

    fetchListings();
  }, []);
console.log(saleListings)
  return (
    <>
      {/* Hero */}
      <div className="max-w-6xl mx-auto p-28 px-3 flex flex-col gap-6">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span> <br />
          vehicle with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          iftiinsheAuto is the best place to find your next vehicle.
        </div>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's get started
        </Link>
      </div>

      {/* Swiper */}
      {loadingOffers ? (
        <p className="text-center text-gray-500">Loading offers...</p>
      ) : (
        <Swiper navigation>
          {offerListings?.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                className="h-[75vh]"
                style={{
                  background: `url(${
                    listing.imageURLs?.[0] || "/default.jpg"
                  }) center no-repeat`,
                  backgroundSize: "cover",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Offers */}
      <div className="max-w-6xl mx-auto p-3 my-10">
        {loadingOffers ? (
          <p className="text-gray-500">Loading offers...</p>
        ) : (
          offerListings.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent offers
              </h2>
              <Link to="/search?offer=true" className="text-blue-800 text-sm">
                Show more offers
              </Link>

              <div className="flex flex-wrap gap-4 mt-4">
                {offerListings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))}
              </div>
            </>
          )
        )}
      </div>

      {/* Rent */}
      <div className="max-w-6xl mx-auto p-3 my-10">
        {loadingRent ? (
          <p className="text-gray-500">Loading rent cars...</p>
        ) : (
          rentListings.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent cars for rent
              </h2>
              <Link to="/search?type=rent" className="text-blue-800 text-sm">
                Show cars for rent
              </Link>

              <div className="flex flex-wrap gap-4 mt-4">
                {rentListings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))}
              </div>
            </>
          )
        )}
      </div>

      {/* Sale */}
      <div className="max-w-6xl mx-auto p-3 my-10">
        {loadingSale ? (
          <p className="text-gray-500">Loading cars for sale...</p>
        ) : (
          saleListings.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold text-slate-600">
                Recent cars for sale 
              </h2>
              <Link to="/search?type=sale" className="text-blue-800 text-sm">
                Show cars for sale
              </Link>


              <div className="flex flex-wrap gap-4 mt-4">
                {saleListings.map((listing) => (
                  <ListingItem key={listing._id} listing={listing} />
                ))}
              </div>
            </>
          )
        )}
      </div>
    </>
  );
};

export default Home;