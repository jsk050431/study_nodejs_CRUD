const fs = require("fs").promises;
const ejs = require("ejs");
const { getContentsListHTML } = require("../lib/fileList");

module.exports = async function contentRouter(pathName, res) {
    try {
        const template = await fs.readFile("./views/contentView.ejs", "utf-8");
        const _title = decodeURIComponent(pathName.split("/")[2]);
        const content = await fs.readFile(`./data/${_title}`, "utf-8");
        const _description = content;
        const html = ejs.render(template, {
            title: _title,
            contentsListHTML: await getContentsListHTML(),
            contentTitle: _title,
            description: _description,
        });
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
    } catch (err) {
        res.writeHead(500);
        console.error(err);
        res.end("Internal Server Error");
    }
};
