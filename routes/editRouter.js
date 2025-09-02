const fs = require("fs").promises;
const ejs = require("ejs");
const getFormData = require("../lib/getFormData");
const { getContentsListHTML } = require("../lib/fileList");
const getNavbar = require("../lib/getNavbar");

module.exports = async function editRouter(pathName, targetTitle, req, res) {
    if (pathName === "/edit") {
        try {
            const template = await fs.readFile(
                "./views/editView.ejs",
                "utf-8"
            );
            const targetDescription = await fs.readFile(
                `./data/${targetTitle}`,
                "utf-8"
            );
            const html = ejs.render(template, {
                title: targetTitle,
                navbar: await getNavbar(),
                contentsListHTML: await getContentsListHTML(),
                targetTitle: targetTitle,
                targetDescription: targetDescription,
            });
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        } catch (err) {
            res.writeHead(500);
            console.error(err);
            res.end("Internal Server Error");
        }
    } else if (pathName === "/edit/process") {
        try {
            const post = await getFormData(req);
            const targetTitle = post.targetTitle;
            const newTitle = post.newTitle;
            const description = post.description;
            await fs.rename(`data/${targetTitle}`, `data/${newTitle}`);
            await fs.writeFile(`data/${newTitle}`, description, "utf-8");
            res.writeHead(303, {
                Location: `/content/${encodeURIComponent(newTitle)}`,
            });
            res.end();
        } catch (err) {
            console.error(err);
            res.writeHead(500);
            res.end("Internal Server Error");
        }
    }
};