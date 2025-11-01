import { insertInitialRows } from "../data/notesData.js";

export async function initDB(sequelize) {
    const tables = await sequelize.showAllSchemas();
    const tablesName = tables.map((target) => {
        return Object.values(target)[0];
    });
    const notesTableExists = tablesName.includes("notes") ? true : false;

    await sequelize.sync();

    if (!notesTableExists) {
        await insertInitialRows();
    }
}
