import fs from "fs/promises";
import { getContentsListHTML } from "../lib/fileList.js";
import getNavbar from "../lib/getNavbar.js";

export async function getCreateView(req, res) {
    res.status(200).render("createView", {
        navbar: await getNavbar(),
        contentsListHTML: await getContentsListHTML(),
    });
}

export async function createContent(req, res) {
    const { title, description } = req.body;
    await fs.writeFile(`data/${title}`, description, "utf-8");
    res.status(201).redirect(`/content/${encodeURIComponent(title)}`);
}
