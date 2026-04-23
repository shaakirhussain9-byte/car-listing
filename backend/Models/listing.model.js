import mongoose from "mongoose";

const carListingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, //
    },
    description: {
      type: String,
      required: true, //
    },
    make: {
      type: String,
      required: true, // Toyota, Nissan
    },
    model: {
      type: String,
      required: true, // Camry, RAV
    },
    year: {
      type: Number,
      required: true, // 2021
    },
    price: {
      type: Number,
      required: true, // 20000
    },
    discount: {
      type: Number,
    },
    offer: {
      type: Boolean,
    },
    mileage: {
      type: Number,
      required: true, // 150000
    },
    fuelType: {
      type: String,
      required: true,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
    },
    transmission: {
      type: String,
      required: true,
      enum: ["Automatic", "Manual", "CVT"],
    },
    condition: {
      type: String,
      required: true,
      enum: ["New", "Used", "Damaged"],
    },
    imageURLs: {
      type: Array,
    },
    location: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["sale", "rent"],
    },
    sellerRef: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CarListing = mongoose.model("CarListing", carListingSchema);
export default CarListing;