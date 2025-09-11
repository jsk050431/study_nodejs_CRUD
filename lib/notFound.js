import fs from "fs/promises";

async function notFound(req, res) {
    const data = await fs.readFile("./public/notfound.html");
    res.status(404).type("html").send(data);
}

export default notFound;
