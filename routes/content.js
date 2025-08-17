const fs = require("fs");
const ejs = require("ejs");
const getContentsListHTML = require("../getContentsListHTML");

module.exports = function homeRouter(pathName, res) {
    fs.readFile("./public/index.ejs", "utf-8", async (err, template) => {
        if (err) {
            res.writeHead(500);
            console.error(err);
            res.end("Internal Server Error");
        }

        const _title = pathName.split("/")[2];
        fs.readFile(`./data/${_title}`, "utf-8", async (err, content) => {
            if (err) {
                res.writeHead(500);
                console.error(err);
                res.end("Internal Server Error");
            }
            const _description = content;
            const html = ejs.render(template, {
                title: _title,
                contentsListHTML: await getContentsListHTML(),
                contentTitle: _title,
                description: _description,
            });
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        });
    });
};
