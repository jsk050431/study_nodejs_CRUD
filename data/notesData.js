import SQ from "sequelize";
import { sequelize } from "../db/database.js";
import fs from "fs/promises";

const DataTypes = SQ.DataTypes;

const Note = sequelize.define("note", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

export async function insertInitialRows() {
    const initialRowsJson = await fs.readdir("./data/initialRows");
    const initialRows = await Promise.all(
        initialRowsJson.map(async (target) => {
            const json = await fs.readFile(
                `./data/initialRows/${target}`,
                "utf8"
            );
            return JSON.parse(json);
        })
    );
    await Note.bulkCreate(initialRows);
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
