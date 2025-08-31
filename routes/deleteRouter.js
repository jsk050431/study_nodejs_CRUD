const fs = require("fs").promises;

function getFormData(request) {
    const qs = require("querystring");
    let body = "";

    return new Promise((resolve, reject) => {
        request.on("data", (chunk) => (body += chunk));
        request.on("end", () => resolve(qs.parse(body)));
        request.on("error", (err) => reject(err));
    });
}

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
