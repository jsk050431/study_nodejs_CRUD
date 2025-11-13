import { deleteNote, getNote } from "../data/noteData.js";

export async function deleteContent(req, res) {
    const { targetTitle } = req.body;
    const target = await getNote(targetTitle);
    await deleteNote(target.id);
    res.status(200).redirect("/");
}
