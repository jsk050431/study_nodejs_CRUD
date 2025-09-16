import fs from "fs/promises";
import * as fileList from "../lib/fileList.js";
import getNavbar from "../lib/getNavbar.js";
import createError from "http-errors";

export async function getEditView(req, res, next) {
    const targetTitle = req.params.contentName;
    if (!(await fileList.isExists(targetTitle))) {
        return next(createError(404));
    }
    const targetDescription = await fs.readFile(
        `./data/${targetTitle}`,
        "utf-8"
    );
    res.status(200).render("editView", {
        title: targetTitle,
        navbar: await getNavbar(),
        contentsListHTML: await fileList.getContentsListHTML(targetTitle),
        targetTitle: targetTitle,
        targetDescription: targetDescription,
    });
}

export async function editContent(req, res) {
    const { targetTitle, newTitle, description } = req.body;
    await fs.rename(`data/${targetTitle}`, `data/${newTitle}`);
    await fs.writeFile(`data/${newTitle}`, description, "utf-8");
    res.status(303).redirect(`/content/${encodeURIComponent(newTitle)}`);
}
