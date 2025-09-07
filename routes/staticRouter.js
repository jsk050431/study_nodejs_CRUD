import fs from "fs";
import path from "path";

export default function staticRouter(pahtName, res) {
    const ext = path.extname(pahtName);
    const contentType = {
        ".css": "text/css",
        ".js": "application/javascript",
    }[ext];
    if (contentType === undefined) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        console.error("Unexpected extension");
        res.end("Internal Server Error");
    }
    const filePath = `./${pahtName}`;
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            console.error(err);
            return res.end("File Not Found");
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data);
        }
    });
};
