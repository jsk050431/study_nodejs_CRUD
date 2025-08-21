const fs = require("fs");
const ejs = require("ejs");
const getContentsListHTML = require("../getContentsListHTML");

module.exports = function homeRouter(req, res) {
    fs.readFile("./public/index.ejs", "utf-8", async (err, template) => {
        if (err) {
            res.writeHead(500);
            console.error(err);
            res.end("Internal Server Error");
        }
        const html = ejs.render(template, {
            contentsListHTML: await getContentsListHTML(),
        });
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
    });
};
