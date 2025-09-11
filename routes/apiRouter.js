import express from "express";
import { fileList } from "../lib/fileList.js";

const router = express.Router();
router.get("/getContentsList", async (req, res) => {
    res.status(200).json(await fileList.getList());
});

export default router;
