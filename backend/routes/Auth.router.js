import { Router } from "express";
import { Signing, Signup } from "../Controller/Auth.Controller.js";
const router = Router()

router.post('/Signup', Signup)
router.post("/Signin", Signing)

export default router