const { fileList } = require("../lib/fileList");

module.exports = async function apiRouter(pathName, res) {
    if (pathName === "/api/getContentsList") {
        const contentsList = JSON.stringify(await fileList.getList());
        res.end(contentsList);
    }
};
