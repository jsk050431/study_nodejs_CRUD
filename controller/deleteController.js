import fs from "fs/promises";

export async function deleteContent(req, res) {
    const { targetTitle } = req.body;
    await fs.unlink(`data/${targetTitle}`);
    res.status(200).redirect("/");
}
