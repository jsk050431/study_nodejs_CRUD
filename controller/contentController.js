import * as notesLib from "../lib/notesLib.js";
import getNavbar from "../lib/getNavbar.js";
import createError from "http-errors";
import { getNote } from "../data/noteData.js";

export async function getContentView(req, res, next) {
    const title = req.params.contentName;
    const titleExists = await notesLib.isExists(title);
    if (!titleExists) {
        return next(createError(404));
    }
    const note = await getNote(title);
    const description = note.description;
    res.status(200).render("contentView", {
        title: title,
        navbar: await getNavbar(),
        contentsListHTML: await notesLib.getContentsListHTML(title),
        contentTitle: title,
        description: description,
    });
}
