import { getContentsListHTML } from "../lib/notesLib.js";
import getNavbar from "../lib/getNavbar.js";
import { createNote } from "../data/noteData.js";

export async function getCreateView(req, res) {
    res.status(200).render("createView", {
        navbar: await getNavbar(),
        contentsListHTML: await getContentsListHTML(),
    });
}

export async function createContent(req, res) {
    const { title, description } = req.body;
    await createNote(title, description);
    res.status(201).redirect(`/content/${encodeURIComponent(title)}`);
}
