import * as notesLib from "../lib/notesLib.js";
import getNavbar from "../lib/getNavbar.js";
import createError from "http-errors";
import { editNote, getNote } from "../data/noteData.js";

export async function getEditView(req, res, next) {
    const targetTitle = req.params.contentName;
    if (!(await notesLib.isExists(targetTitle))) {
        return next(createError(404));
    }
    const note = await getNote(targetTitle);
    const targetDescription = note.description;

    res.status(200).render("editView", {
        title: targetTitle,
        navbar: await getNavbar(),
        targetTitle: targetTitle,
        targetDescription: targetDescription,
    });
}

export async function editContent(req, res) {
    const { targetTitle, newTitle, description } = req.body;
    const target = await getNote(targetTitle);
    await editNote(target.id, newTitle, description);
    res.status(303).redirect(`/content/${encodeURIComponent(newTitle)}`);
}
