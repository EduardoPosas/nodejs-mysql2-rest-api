import { Router } from "express";
import { ping } from "../controllers/index.controller.js";
import checkAuthentication from "../middlewares/authentication.middeware.js";

const router = Router();

router.get('/ping', checkAuthentication, ping);

export default router;