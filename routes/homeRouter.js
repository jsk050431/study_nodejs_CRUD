import express from "express";
import * as homeController from "../controller/homeController.js";
import notFound from "../lib/notFound.js";

const router = express.Router();

router.get("/", homeController.getHomeView);
router.use(notFound);

export default router;
