import { Router } from "express";
import { tast } from "../Controller/User.Controller.js";

const router = Router();

router.get("/", tast);


export default router;