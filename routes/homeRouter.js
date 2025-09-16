import express from "express";
import { getContentsListHTML } from "../lib/fileList.js";
import getNavbar from "../lib/getNavbar.js";
import notFound from "../lib/notFound.js";

const router = express.Router();

router.get("/", async (req, res) => {
    res.status(200).render("homeView", {
        navbar: await getNavbar(),
        contentsListHTML: await getContentsListHTML(),
    });
});

router.use(notFound);

export default router;
