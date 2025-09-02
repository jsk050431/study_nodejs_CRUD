const fs = require("fs");

module.exports = function () {
    return new Promise((resolve, reject) => {
        fs.readFile("./public/navbar.html", "utf-8", (err, navbar) => {
            if (err) reject(new Error(err));
            else resolve(navbar);
        });
    });
};
