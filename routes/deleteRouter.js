import express from "express";
import * as deleteController from "../controller/deleteController.js";
import notFound from "../lib/notFound.js";

const router = express.Router();

router.delete("/", deleteController.deleteContent);
router.use(notFound);

export default router;
