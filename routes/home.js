const fs = require("fs");
const ejs = require("ejs");

module.exports = function homeRouter(req, res) {
    fs.readFile("./public/index.ejs", "utf-8", (err, template) => {
        if (err) {
            res.writeHead(500);
            console.error(err);
            res.end("Internal Server Error");
        }
        const html = ejs.render(template, {
            title: "Welcome",
            contentTitle: "Welcome",
            description: "",
        });
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
    });
};
