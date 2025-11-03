import * as notesData from "../data/notesData.js";

export const notes = {
    async getList() {
        return await notesData.getAllTitles();
    },
    toHTML(notes, currentTitle) {
        let html = "";
        notes.forEach((fileName) => {
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

export async function getContentsListHTML(currentTitle) {
    const contentsList = await notes.getList();
    const contentsListHTML = notes.toHTML(contentsList, currentTitle);
    return contentsListHTML;
}

export async function isExists(title) {
    const contentsList = await notes.getList();
    return contentsList.includes(title);
}
