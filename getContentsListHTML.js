const fileList = require("./fileList")

async function getContentsListHTML() {
    const contentsList = await fileList.getList();
    const contentsListHTML = fileList.toHTML(contentsList);
    return contentsListHTML;
}

module.exports = getContentsListHTML;
