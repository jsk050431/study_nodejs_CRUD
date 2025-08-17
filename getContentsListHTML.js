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
        html = "<ul>" + html + "</ul>";
        return html;
    },
};

async function getContentsListHTML() {
    const contentsList = await fileList.getList();
    const contentsListHTML = fileList.toHTML(contentsList);
    return contentsListHTML;
}

module.exports = getContentsListHTML;
