import Note from "../models/noteModel.js";
import fs from "fs/promises";

export async function insertSeedData() {
    const seedDataJson = await fs.readdir("./data/seed");
    const seedData = await Promise.all(
        seedDataJson.map(async (target) => {
            const json = await fs.readFile(`./data/seed/${target}`, "utf8");
            return JSON.parse(json);
        })
    );
    await Note.bulkCreate(seedData);
}

export async function getAllTitles() {
    const result = await Note.findAll({ order: [["id", "ASC"]] });
    const titles = result.map((row) => {
        return row.title;
    });
    return titles;
}

export async function getNote(title) {
    const result = await Note.findOne({ where: { title } });
    return result;
}

export async function createNote(title, description) {
    await Note.create({ title, description });
}

export async function editNote(id, newTitle, description) {
    const target = await Note.findByPk(id);
    target.title = newTitle;
    target.description = description;
    await target.save();
}

export async function deleteNote(id) {
    const target = await Note.findByPk(id);
    target.destroy();
}
