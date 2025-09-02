const fs = require("fs").promises;

module.exports = async function () {
    return fs.readFile("./public/navbar.html", "utf-8");
};
