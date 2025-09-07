const fs = require("fs").promises;

module.exports = async function deleteRouter(formData, res) {
    try {
        const post = formData;
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
