const fs = require("fs");
const ejs = require("ejs");
const getContentsListHTML = require("../getContentsListHTML");

function getFormData(request) {
    const qs = require("querystring");
    let body = "";

    return new Promise((resolve, reject) => {
        request.on("data", (chunk) => (body += chunk));
        request.on("end", () => {
            resolve(qs.parse(body));
        });
        request.on("error", () => reject(err));
    });
}

module.exports = async function createRouter(pathName, req, res) {
    if (pathName === "/create") {
        fs.readFile("./public/create.ejs", "utf-8", async (err, template) => {
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
    } else if (pathName === "/create/process") {
        try {
            const post = await getFormData(req);
            const title = post.title;
            const description = post.description;
            fs.writeFile(`data/${title}`, description, "utf-8", (err) => {
                if (err) {
                    res.writeHead(500);
                    console.error(err);
                    res.end("Internal Server Error");
                }
                res.writeHead(302, {
                    Location: encodeURI(`/content/${title}`),
                });
                res.end();
            });
        } catch (err) {
            console.error("Error parsing form data:", err);
            res.writeHead(500);
            res.end("Internal Server Error");
        }
    }
};
