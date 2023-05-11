import { DataTypes } from "sequelize";
import { db } from "../db.js";
import Proyect from "./proyect.js";

const User = db.define("users", {
  name: {
    type: DataTypes.STRING,
  },
  lastNameF: {
    type: DataTypes.STRING,
  },
  lastNameM: {
    type: DataTypes.STRING,
  },
  pass: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  career: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
  },
});

Proyect.hasMany(User);
User.belongsTo(Proyect);

export default User;
