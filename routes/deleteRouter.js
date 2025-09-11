import express from "express";
import fs from "fs/promises";
import notFound from "../lib/notFound.js";

const router = express.Router();

router.delete("/", async (req, res) => {
    const { targetTitle } = req.body;
    await fs.unlink(`data/${targetTitle}`);
    res.status(200).redirect("/");
});

router.use(notFound);

export default router;
