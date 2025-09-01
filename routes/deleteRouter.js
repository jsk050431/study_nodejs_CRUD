const fs = require("fs").promises;
const getFormData = require("../lib/getFormData");
const getNavbar = require("../lib/getNavbar");

module.exports = async function deleteRouter(req, res) {
    try {
        const post = await getFormData(req);
        const targetTitle = post.targetTitle;
        await fs.unlink(`data/${targetTitle}`);
        res.writeHead(303, { Location: "/" });
        res.end();
    } catch (err) {
        console.error(err);
        res.writeHead(500);
        res.end("Internal Server Error");
    }
};
