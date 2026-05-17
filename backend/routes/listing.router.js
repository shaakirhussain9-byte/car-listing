import { Router } from "express";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getListings,
} from "../Controller/Listing.Controller.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = Router();

router.post("/", createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.put("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing);
router.get("/get", getListings);
export default router;
