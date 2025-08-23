const fs = require("fs");

const fileList = {
    getList() {
        return new Promise((resolve, reject) => {
            fs.readdir("./data", (err, fileList) => {
                if (err) reject(new Error(err));
                else resolve(fileList);
            });
        });
    },
    toHTML(fileList) {
        let html = "";
        fileList.forEach((fileName) => {
            html += `<li><a href="/content/${fileName}">${fileName}</a></li>`;
        });
        html = `<h2><a href="/">Home</a></h2>` + "<ul>" + html + "</ul>";
        return html;
    },
};

module.exports = fileList;