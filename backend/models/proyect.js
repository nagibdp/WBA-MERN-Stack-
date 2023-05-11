import { DataTypes } from "sequelize";
import { db } from "../db.js";

const Proyect = db.define("proyects", {
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT
    },
    keyword: {
        type: DataTypes.TEXT
    },
    document: {
        type: DataTypes.STRING
    }
})

export default Proyect;