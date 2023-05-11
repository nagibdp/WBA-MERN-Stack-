import { DataTypes } from "sequelize";
import { db } from "../db.js";
import User from "./user.js";

const Profile = db.define("profiles", {
  cel: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  estudy: {
    type: DataTypes.TEXT,
  },
  academy: {
    type: DataTypes.STRING,
  },
  available: {
    type: DataTypes.TINYINT,
  },
  place_at: {
    type: DataTypes.STRING,
  },
  dt_visible: {
    type: DataTypes.TINYINT,
  },
  keyword1: {
    type: DataTypes.STRING,
  },
  keyword2: {
    type: DataTypes.STRING,
  },
  keyword3: {
    type: DataTypes.STRING,
  },
  keyword4: {
    type: DataTypes.STRING,
  },
  keyword5: {
    type: DataTypes.STRING,
  },
  picture: {
    type: DataTypes.STRING,
  },
});

User.hasOne(Profile);
Profile.belongsTo(User);

export default Profile;
