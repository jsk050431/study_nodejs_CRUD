import express from "express";
import fs from "fs/promises";
import ejs from "ejs";
import { getContentsListHTML } from "../lib/fileList.js";
import getNavbar from "../lib/getNavbar.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const template = await fs.readFile("./views/createView.ejs", "utf-8");
    const html = ejs.render(template, {
        navbar: await getNavbar(),
        contentsListHTML: await getContentsListHTML(),
    });
    res.status(200).type("html").send(html);
});

router.post("/", async (req, res) => {
    console.log(req.body);
    const { title, description } = req.body;
    await fs.writeFile(`data/${title}`, description, "utf-8");
    res.status(201).redirect(`/content/${encodeURIComponent(title)}`);
});

export default router;
