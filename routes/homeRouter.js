import express from "express";
import fs from "fs/promises";
import ejs from "ejs";
import { getContentsListHTML } from "../lib/fileList.js";
import getNavbar from "../lib/getNavbar.js";
import notFound from "../lib/notFound.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const template = await fs.readFile("./views/homeView.ejs", "utf-8");
    const html = ejs.render(template, {
        navbar: await getNavbar(),
        contentsListHTML: await getContentsListHTML(),
    });
    res.status(200).type("html").send(html);
});

router.use(notFound);

export default router;
