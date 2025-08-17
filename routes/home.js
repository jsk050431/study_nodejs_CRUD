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
        const _contentsListHTML = await getContentsListHTML();
        const html = ejs.render(template, {
            title: "Welcome",
            contentsListHTML: _contentsListHTML,
            contentTitle: "Welcome",
            description: "",
        });
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
    });
};
