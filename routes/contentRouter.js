import express from "express";
import * as contentController from "../controller/contentController.js";
import notFound from "../lib/notFound.js";

const router = express.Router();

router.get("/:contentName", contentController.getContentView);
router.use(notFound);

export default router;
