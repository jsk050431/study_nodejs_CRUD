import http from "http";
import fs from "fs";
import url from "url";
import getFormData from "./lib/getFormData.js";
import homeRouter from "./routes/homeRouter.js";
import staticRouter from "./routes/staticRouter.js";
import contentRouter from "./routes/contentRouter.js";
import createRouter from "./routes/createRouter.js";
import editRouter from "./routes/editRouter.js";
import deleteRouter from "./routes/deleteRouter.js";
import apiRouter from "./routes/apiRouter.js";

const server = http.createServer(async function (req, res) {
    const formData = await getFormData(req);
    if (formData._method) req.method = formData._method;
    console.log(`request: ${req.method}, ${req.url}`);
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
        createRouter(formData, req.method, res);
    } else if (pathName.startsWith("/edit")) {
        const target = queryData.target;
        editRouter(target, formData, req.method, res);
    } else if (pathName === "/delete") {
        deleteRouter(formData, res);
    } else if (pathName.startsWith("/api")) {
        apiRouter(pathName, res);
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
