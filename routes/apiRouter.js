import express from "express";
import { notes } from "../lib/notesLib.js";

const router = express.Router();
router.get("/getContentsList", async (req, res) => {
    res.status(200).json(await notes.getList());
});

export default router;
