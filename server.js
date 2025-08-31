const http = require("http");
const fs = require("fs");
const url = require("url");
const homeRouter = require("./routes/homeRouter");
const staticRouter = require("./routes/staticRouter");
const contentRouter = require("./routes/contentRouter");
const createRouter = require("./routes/createRouter");
const updateRouter = require("./routes/updateRouter");

const server = http.createServer(function (req, res) {
    // console.log(`request: ${req.method}, ${req.url}`);
    const pathName = url.parse(req.url, true).pathname;
    const queryData = url.parse(req.url, true).query;
    if (pathName === "/favicon.ico") {
        res.writeHead(404, { "Content-Type": "text/plain" });
        return res.end();
    } else if (pathName === "/") {
        homeRouter(req, res);
    } else if (
        pathName.startsWith("/public/css") ||
        pathName.startsWith("/public/js")
    ) {
        staticRouter(pathName, res);
    } else if (pathName.startsWith("/content")) {
        contentRouter(pathName, res);
    } else if (pathName.startsWith("/create")) {
        createRouter(pathName, req, res);
    } else if (pathName.startsWith("/update")) {
        const target = queryData.target;
        updateRouter(pathName, target, req, res);
    } else {
        fs.readFile("./public/notfound.html", (err, data) => {
            if (err) {
                res.writeHead(500);
                console.error(err);
                res.end("Internal Server Error");
            } else {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end(data);
            }
        });
    }
});

server.listen(3000);
