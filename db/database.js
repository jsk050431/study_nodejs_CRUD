import mysql from "mysql2";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "crud_mynote",
    password: "qwer1234",
});

export const db = pool.promise();
