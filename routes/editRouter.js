import express from "express";
import * as editController from "../controller/editController.js";
import notFound from "../lib/notFound.js";

const router = express.Router();

router.get("/:contentName", editController.getEditView);
router.put("/", editController.editContent);
router.use(notFound);

export default router;
