import express from "express";
import fs from "fs/promises";
import ejs from "ejs";
import * as fileList from "../lib/fileList.js";
import getNavbar from "../lib/getNavbar.js";
import notFound from "../lib/notFound.js";
import createError from "http-errors";

const router = express.Router();

router.get("/:contentName", async (req, res, next) => {
    const title = req.params.contentName;
    if (!(await fileList.isExist(title))) {
        return next(createError(404));
    }
    const description = await fs.readFile(`./data/${title}`, "utf-8");
    res.status(200).render("contentView", {
        title: title,
        navbar: await getNavbar(),
        contentsListHTML: await fileList.getContentsListHTML(title),
        contentTitle: title,
        description: description,
    });
});

router.use(notFound);

export default router;
