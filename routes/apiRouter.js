import { fileList } from "../lib/fileList.js";

export default async function apiRouter(pathName, res) {
    if (pathName === "/api/getContentsList") {
        const contentsList = JSON.stringify(await fileList.getList());
        res.end(contentsList);
    }
};
