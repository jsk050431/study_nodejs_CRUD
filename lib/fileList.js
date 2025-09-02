const fs = require("fs").promises;

const fileList = {
    async getList() {
        return fs.readdir("./data");
    },
    toHTML(fileList) {
        let html = "";
        fileList.forEach((fileName) => {
            html += `<a class="content list-group-item list-group-item-action" href="/content/${fileName}">${fileName}</a>`;
        });
        html = `<div id="contentsList" class="list-group">` + html + "</div>";
        return html;
    },
};

async function getContentsListHTML() {
    const contentsList = await fileList.getList();
    const contentsListHTML = fileList.toHTML(contentsList);
    return contentsListHTML;
}

module.exports = { fileList, getContentsListHTML };
