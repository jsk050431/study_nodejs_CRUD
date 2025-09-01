const fs = require("fs").promises;
const ejs = require("ejs");
const { getContentsListHTML } = require("../lib/fileList");
const getNavbar = require("../lib/getNavbar");

module.exports = async function homeRouter(req, res) {
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
