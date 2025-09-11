import fs from "fs/promises";

const fileList = {
    async getList() {
        return fs.readdir("./data");
    },
    toHTML(fileList, currentTitle) {
        let html = "";
        fileList.forEach((fileName) => {
            let className;
            if (fileName === currentTitle) {
                className =
                    "content list-group-item list-group-item-action active";
            } else {
                className = "content list-group-item list-group-item-action";
            }
            html += `<a class="${className}" href="/content/${fileName}">${fileName}</a>`;
        });
        html = `<div id="contentsList" class="list-group">` + html + "</div>";
        return html;
    },
};

async function getContentsListHTML(currentTitle) {
    const contentsList = await fileList.getList();
    const contentsListHTML = fileList.toHTML(contentsList, currentTitle);
    return contentsListHTML;
}

async function isExists(name) {
    const contentsList = await fileList.getList();
    return contentsList.includes(name);
}

export { fileList, getContentsListHTML, isExists };
