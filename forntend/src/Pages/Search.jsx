import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../Components/ListingItem";
const Search = () => {
  const navigate = useNavigate();

  const [sideBarData, setSideBarData] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    sort: "created_at",
    order: "desc",
    condition: "all",
    transmission: "all",
    fuelType: "all",
  });

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSideBarData({ ...sideBarData, type: e.target.id });
    }
    if (e.target.id === "searchTerm") {
      setSideBarData({ ...sideBarData, searchTerm: e.target.value });
    }
    if (e.target.id === "offer") {
      setSideBarData({
        ...sideBarData,
        offer: e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "condition") {
      setSideBarData({
        ...sideBarData,
        condition: e.target.value,
      });
    }
    if (e.target.id === "transmission") {
      setSideBarData({
        ...sideBarData,
        transmission: e.target.value,
      });
    }
    if (e.target.id === "fuelType") {
      setSideBarData({
        ...sideBarData,
        fuelType: e.target.value,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSideBarData({ ...sideBarData, sort, order });
    }
  };

  // fetch listing

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
    const conditionFromUrl = urlParams.get("condition");
    const fuelTypeFromUrl = urlParams.get("fuelType");
    const transmissionFromUrl = urlParams.get("transmission");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSideBarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
        condition: conditionFromUrl || "all",
        fuelType: fuelTypeFromUrl || "all",
        transmission: transmissionFromUrl || "all",
      });
    }

    const fetchListing = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 7) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };
    fetchListing();
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sideBarData.searchTerm);
    urlParams.set("type", sideBarData.type);
    urlParams.set("offer", sideBarData.offer);
    urlParams.set("sort", sideBarData.sort);
    urlParams.set("order", sideBarData.order);
    urlParams.set("condition", sideBarData.condition);
    urlParams.set("fuelType", sideBarData.fuelType);
    urlParams.set("transmission", sideBarData.transmission);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const showMoreListings = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 8) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              onChange={handleChange}
              value={sideBarData.searchTerm}
              type="text"
              className="border rounded-lg p-3 w-full"
              id="searchTerm"
            />
          </div>
          <hr />
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={sideBarData.type === "all"}
                type="checkbox"
                id="all"
                className="w-5"
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={sideBarData.type === "sale"}
                type="checkbox"
                id="sale"
                className="w-5"
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={sideBarData.type === "rent"}
                type="checkbox"
                id="rent"
                className="w-5"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={sideBarData.offer}
                type="checkbox"
                id="offer"
                className="w-5"
              />
              <span>Offer</span>
            </div>
          </div>
          <hr />
          <div className="flex items-center gap-2">
            <label className="font-semibold">Condition:</label>
            <select
              onChange={handleChange}
              id="condition"
              className="border rounded-lg p-3"
            >
              <option value="all">Any</option>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>
          <hr />
          <div className="flex items-center gap-2">
            <label className="font-semibold">Transmission:</label>
            <select
              onChange={handleChange}
              id="transmission"
              className="border rounded-lg p-3"
            >
              <option value="all">Any</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="CVT">CVT</option>
            </select>
          </div>
          <hr />
          <div className="flex items-center gap-2">
            <label className="font-semibold">Fuel Type:</label>
            <select
              onChange={handleChange}
              id="fuelType"
              className="border rounded-lg p-3"
            >
              <option value="all">Any</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Electric">Electric</option>
            </select>
          </div>
          <hr />
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              id="sort_order"
              className="border rounded-lg p-3"
              defaultValue={"created_at_desc"}
            >
              <option value="price_desc">Price High to Low</option>
              <option value="price_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 cursor-pointer">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing Results
        </h1>
        <div className="flex flex-wrap gap-4 p-7">
          {loading || (listings.length === 0 && <p>No Listing Found</p>)}
          {!loading &&
            listings.length > 0 &&
            listings.map((listing) => <ListingItem listing={listing} />)}{" "}
        </div>{" "}
        {showMore && (
          <button
            onClick={showMoreListings}
            className="mx-auto w-full text-center text-green-700 hover:underline p-7"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
