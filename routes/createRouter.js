import express from "express";
import * as createController from "../controller/createController.js";
import notFound from "../lib/notFound.js";

const router = express.Router();

router.get("/", createController.getCreateView);
router.post("/", createController.createContent);
router.use(notFound);

export default router;
