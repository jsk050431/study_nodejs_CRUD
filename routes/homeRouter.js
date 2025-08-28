const fs = require("fs").promises;
const ejs = require("ejs");
const { getContentsListHTML } = require("../lib/fileList");


module.exports = async function homeRouter(req, res) {
    try {
        const template = await fs.readFile("./views/homeView.ejs", "utf-8");
        const html = ejs.render(template, {
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
