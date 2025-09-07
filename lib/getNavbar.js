import fs from "fs/promises";

export default async function () {
    return fs.readFile("./public/navbar.html", "utf-8");
};
