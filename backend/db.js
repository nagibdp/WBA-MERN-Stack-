//import { createPool } from "mysql2";
import { Sequelize } from "sequelize";

export const db = new Sequelize("WBAV5", "root", "admin", {
    host: "localhost",
    dialect: "mysql",
    port:3306
    //logging: false
});

/* export const pool = createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "admin",
    database: "WBAV5"
}) */

