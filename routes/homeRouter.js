import fs from "fs/promises";
import ejs from "ejs";
import { getContentsListHTML } from "../lib/fileList.js";
import getNavbar from "../lib/getNavbar.js";

export default async function homeRouter(req, res) {
    try {
        const template = await fs.readFile("./views/homeView.ejs", "utf-8");
        const html = ejs.render(template, {
            navbar: await getNavbar(),
            contentsListHTML: await getContentsListHTML(),
        });
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
    } catch (err) {
        res.writeHead(500);
        console.error(err);
        res.end("Internal Server Error");
    }
};
