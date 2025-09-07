const fs = require("fs").promises;
const ejs = require("ejs");
const { getContentsListHTML } = require("../lib/fileList");
const getNavbar = require("../lib/getNavbar");

module.exports = async function createRouter(formData, method, res) {
    if (method === "GET") {
        try {
            const template = await fs.readFile(
                "./views/createView.ejs",
                "utf-8"
            );
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
    } else if (method === "POST") {
        try {
            const post = formData;
            const title = post.title;
            const description = post.description;
            await fs.writeFile(`data/${title}`, description, "utf-8");
            res.writeHead(303, {
                Location: encodeURI(`/content/${title}`),
            });
            res.end();
        } catch (err) {
            console.error(err);
            res.writeHead(500);
            res.end("Internal Server Error");
        }
    }
};
