const http = require("http");
const fs = require("fs");
const url = require("url");
const staticRouter = require("./routes/staitc");

const server = http.createServer(function (req, res) {
    // console.log(`request: ${req.method}, ${req.url}`);
    const pathName = url.parse(req.url, true).pathname;
    const queryData = url.parse(req.url, true).query;
    if (pathName === "/favicon.ico") {
        res.writeHead(404, { "Content-Type": "text/plain" });
        return res.end();
    } else if (pathName === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h2>Welcome</h2>");
    } else if (pathName.startsWith("/css") || pathName.startsWith("/js")) {
        staticRouter(pathName, res);
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
