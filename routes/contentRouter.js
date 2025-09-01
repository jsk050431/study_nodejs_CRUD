const fs = require("fs").promises;
const ejs = require("ejs");
const { getContentsListHTML } = require("../lib/fileList");
const getNavbar = require("../lib/getNavbar");

module.exports = async function contentRouter(pathName, res) {
    try {
        const template = await fs.readFile("./views/contentView.ejs", "utf-8");
        const title = decodeURIComponent(pathName.split("/")[2]);
        const content = await fs.readFile(`./data/${title}`, "utf-8");
        const description = content;
        const html = ejs.render(template, {
            title: title,
            navbar: await getNavbar(),
            contentsListHTML: await getContentsListHTML(),
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
