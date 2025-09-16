import { getContentsListHTML } from "../lib/fileList.js";
import getNavbar from "../lib/getNavbar.js";

export async function getHomeView(req, res) {
    res.status(200).render("homeView", {
        navbar: await getNavbar(),
        contentsListHTML: await getContentsListHTML(),
    });
}
