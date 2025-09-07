import fs from "fs/promises";
import ejs from "ejs";
import { getContentsListHTML } from "../lib/fileList.js";
import getNavbar from "../lib/getNavbar.js";

export default async function contentRouter(pathName, res) {
    try {
        const template = await fs.readFile("./views/contentView.ejs", "utf-8");
        const title = decodeURIComponent(pathName.split("/")[2]);
        const content = await fs.readFile(`./data/${title}`, "utf-8");
        const description = content;
        const html = ejs.render(template, {
            title: title,
            navbar: await getNavbar(),
            contentsListHTML: await getContentsListHTML(title),
            contentTitle: title,
            description: description,
        });
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
    } catch (err) {
        res.writeHead(500);
        console.error(err);
        res.end("Internal Server Error");
    }
};
