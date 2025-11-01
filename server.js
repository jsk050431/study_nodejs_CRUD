import express from "express";
import morgan from "morgan";
import methodOverride from "method-override";
import homeRouter from "./routes/homeRouter.js";
import contentRouter from "./routes/contentRouter.js";
import createRouter from "./routes/createRouter.js";
import editRouter from "./routes/editRouter.js";
import deleteRouter from "./routes/deleteRouter.js";
import apiRouter from "./routes/apiRouter.js";
import notFound from "./lib/notFound.js";

import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { config } from "./config.js";
import { sequelize } from "./db/database.js";
import { initDB } from "./db/initDB.js";


const server = express();
server.use(morgan("tiny"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(methodOverride("_method"));
server.set("views", path.join(__dirname, "views"));
server.set("view engine", "ejs");

server.get("/favicon.ico", (req, res) => res.sendStatus(404));
server.use("/static", express.static(path.join(__dirname, "public")));

server.all("/", homeRouter);
server.use("/content", contentRouter);
server.use("/create", createRouter);
server.use("/edit", editRouter);
server.use("/delete", deleteRouter);
server.use("/api", apiRouter);

server.use(notFound);
server.use((err, req, res, next) => {
    if (err.status === 404) {
        console.error(err);
        notFound(req, res);
    } else {
        console.error(err);
        res.sendStatus(500);
    }
});

await initDB(sequelize);

server.listen(config.host.port);
