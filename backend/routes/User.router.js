import { Router } from "express";
import {
  test,
  updateUser,
  deleteUser,
//  getUserListing,
  getUser,
} from "../Controller/User.Controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = Router();

router.get("/", test);
router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
//router.get("/listings/:id", verifyToken, getUserListing);
router.get("/:id", verifyToken, getUser);

export default router;