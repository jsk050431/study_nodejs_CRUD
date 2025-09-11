import express from "express";
import fs from "fs/promises";
import ejs from "ejs";
import * as fileList from "../lib/fileList.js";
import getNavbar from "../lib/getNavbar.js";
import notFound from "../lib/notFound.js";
import createError from "http-errors";

const router = express.Router();

router.get("/:contentName", async (req, res, next) => {
    const targetTitle = req.params.contentName;
    if (!(await fileList.isExist(targetTitle))) {
        return next(createError(404));
    }

    const template = await fs.readFile("./views/editView.ejs", "utf-8");
    const targetDescription = await fs.readFile(
        `./data/${targetTitle}`,
        "utf-8"
    );
    const html = ejs.render(template, {
        title: targetTitle,
        navbar: await getNavbar(),
        contentsListHTML: await fileList.getContentsListHTML(targetTitle),
        targetTitle: targetTitle,
        targetDescription: targetDescription,
    });
    res.status(200).type("html").send(html);
});

router.put("/", async (req, res) => {
    const { targetTitle, newTitle, description } = req.body;
    await fs.rename(`data/${targetTitle}`, `data/${newTitle}`);
    await fs.writeFile(`data/${newTitle}`, description, "utf-8");
    res.status(303).redirect(`/content/${encodeURIComponent(newTitle)}`);
});

router.use(notFound);

export default router;
