import { Router } from "express";
import { Signup } from "../Controller/Auth.Controller.js";
const router = Router()

router.post('/Signup', Signup)

export default router