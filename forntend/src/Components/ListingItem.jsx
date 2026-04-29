import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { BsFillFuelPumpFill, BsSpeedometer } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import moment from "moment";
const ListingItem = ({ listing }) => {
  return (
    <div className="bg-white relative shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg  sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          className="h-[350px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
          src={listing.imageURLs[0]}
          alt=""
        />
      </Link>
      <div className="p-3 flex flex-col gap-2 w-full">
        <p className="truncate text-lg font-semibold text-slate-700">
          {listing.name}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-green-700" />{" "}
            <p>{listing.location}</p>
          </div>
          <div className="text-red-500 py-1 px-2 rounded-lg font-bold italic capitalize">
            {listing.type}
          </div>
        </div>
        <p className="truncate">{listing.description}</p>
        <p className="text-slate-500 mt-2 font-semibold">
          ${listing.offer ? listing.discount : listing.price}
          {listing.type === "rent" && " /month"}
        </p>
        <hr />
        <div className="flex justify-around items-center py-2">
          <GiGearStickPattern />{" "}
          <span className="font-semibold italic">{listing.transmission}</span>
          <BsFillFuelPumpFill />{" "}
          <span className="font-semibold italic">{listing.fuelType}</span>
          <BsSpeedometer />{" "}
          <span className="font-semibold italic">{listing.mileage} km</span>
        </div>
      </div>
      <span className="absolute top-1 right-1 text-slate-50 bg-slate-700 p-2 rounded-lg">
        {moment(listing.createdAt).fromNow()}
      </span>
    </div>
  );
};

export default ListingItem;