import { db } from "../db/database.js";

export async function getAllTitles() {
    const result = await db.execute("SELECT title FROM notes");
    const titles = result[0].map((row) => {
        return row.title;
    });
    return titles;
}

export async function getNote(title) {
    const result = await db.execute("SELECT * FROM notes WHERE title=?", [
        title,
    ]);
    const note = result[0][0];
    return note;
}

export async function createNote(title, description) {
    await db.execute("INSERT INTO notes (title, description) VALUES (?,?)", [
        title,
        description,
    ]);
}

export async function editNote(id, title, description) {
    await db.execute("UPDATE notes SET title=?, description=? WHERE id=?", [
        title,
        description,
        id,
    ]);
}

export async function deleteNote(id) {
    await db.execute("DELETE FROM notes WHERE id=?", [id]);
}
