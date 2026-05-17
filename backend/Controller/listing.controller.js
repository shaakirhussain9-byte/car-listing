import CarListing from "../Models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await CarListing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await CarListing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }
  // check if the user is the owner of the listing
  if (req.user.id !== listing.sellerRef) {
    return next(errorHandler(401, "You can only delete your own listings"));
  }
  // let's delete
  try {
    await CarListing.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await CarListing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }
  // check if the user is the owner of the listing
  if (req.user.id !== listing.sellerRef) {
    return next(errorHandler(401, "You can only update your own listings"));
  }

  try {
    const updatedListing = await CarListing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await CarListing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    // limit
    const limit = parseInt(req.query.limit) || 8;

    // start index
    const startIndex = parseInt(req.query.startIndex) || 0;

    // handle offer
    let offer = req.query.offer;

    if (offer === "undefined" || offer === undefined) {
      offer = { $in: [false, true] };
    }

    //handle type
    let type = req.query.type;

    if (type === "undefined" || type === "all" || type === undefined) {
      type = { $in: ["rent", "sale"] };
    }

    //handle transmission
    let transmission = req.query.transmission;

    if (
      transmission === "undefined" ||
      transmission === undefined ||
      transmission === "all"
    ) {
      transmission = { $in: ["Manual", "Automatic", "CVT"] };
    }
    //handle condition
    let condition = req.query.condition;

    if (
      condition === "undefined" ||
      condition === undefined ||
      condition === "all"
    ) {
      condition = { $in: ["New", "Used", "Damaged"] };
    }
    //handle fueltype
    let fuelType = req.query.fuelType;

    if (
      fuelType === "undefined" ||
      fuelType === undefined ||
      fuelType === "all"
    ) {
      fuelType = { $in: ["Petrol", "Diesel", "Electric", "Hybrid"] };
    }

    // search term
    const searchTerm = req.query.searchTerm || "";

    // sort
    const sort = req.query.sort || "createdAt";
    //order
    const order = req.query.order || "desc";
    const listings = await CarListing.find({
      offer,
      type,
      transmission,
      condition,
      fuelType,
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { make: { $regex: searchTerm, $options: "i" } },
        { model: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { location: { $regex: searchTerm, $options: "i" } },
      ],
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
