import express from "express";
import fs from "fs/promises";
import { getContentsListHTML } from "../lib/fileList.js";
import getNavbar from "../lib/getNavbar.js";
import notFound from "../lib/notFound.js";

const router = express.Router();

router.get("/", async (req, res) => {
    res.status(200).render("createView", {
        navbar: await getNavbar(),
        contentsListHTML: await getContentsListHTML(),
    });
});

router.post("/", async (req, res) => {
    const { title, description } = req.body;
    await fs.writeFile(`data/${title}`, description, "utf-8");
    res.status(201).redirect(`/content/${encodeURIComponent(title)}`);
});

router.use(notFound);

export default router;
