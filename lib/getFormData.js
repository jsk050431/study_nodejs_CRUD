module.exports = function getFormData(request) {
    const qs = require("querystring");
    let body = "";

    return new Promise((resolve, reject) => {
        request.on("data", (chunk) => (body += chunk.toString()));
        request.on("end", () => resolve(qs.parse(body)));
        request.on("error", (err) => reject(err));
    });
};
