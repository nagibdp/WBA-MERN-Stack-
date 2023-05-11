import { db } from "../db.js";
import { encrypt, compare } from "../helpers/handleBcrypt.js";
import { tokenSign } from "../helpers/generateToken.js";
import User from "../models/user.js";
import Profile from "../models/profile.js";
import Proyect from "../models/proyect.js";
import fs from "fs";
import { resolve } from "path";

const signUp = async (req, res) => {
  try {
    const { name, lastNameF, lastNameM, pass, email, career } = req.body;
    let role = "";
    email.includes("alumno.ipn.mx") ? (role = "student") : (role = "teacher"); //VERIFICAR LOS TIPOOS DE CORREOS-------
    const passHash = await encrypt(pass);
    const registerUser = await User.create({
      name,
      lastNameF,
      lastNameM,
      pass: passHash,
      email,
      career,
      role,
    });
    res.send(registerUser);
    return registerUser;
  } catch (error) {
    console.error(error);
  }
};

const signIn = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (user == null) {
      res.status(409);
      res.send({
        error: "Email incorrecto",
      });
    }
    const checkPass = await compare(pass, user.pass);
    const tokenSession = await tokenSign(user);
    if (checkPass) {
      res.send({
        data: user,
        tokenSession,
      });
      return;
    }
    if (!checkPass) {
      res.status(409);
      res.send({
        error: "Contraseña incorrecta",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const ping = async (req, res) => {
  try {
    const result = await db.query("SELECT 1+1 as result");
    console.log(result);
    res.json("ping");
  } catch (error) {
    console.error(error);
  }
};

const getHome = async (req, res) => {
  try {
    const profiles = await Profile.findAll({
      include: User,
      where: { available: 1 },
    });
    res.json(profiles);
  } catch (error) {
    console.error(error);
  }
};

const validateToken = async (req, res) => {
  try {
    res.send(true);
  } catch (error) {
    console.error(error);
  }
};

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({
      include: User,
      where: { userId: req.params.id },
    });
    res.json(profile);
  } catch (error) {
    console.error(error);
  }
};

const createProfile = async (req, res) => {
  try {
    const {
      id,
      cel,
      description,
      estudy,
      academy,
      available,
      place_at,
      dt_visible,
      keyword1,
      keyword2,
      keyword3,
      keyword4,
      keyword5,
      picture,
    } = req.body;
    const newProfile = await Profile.create({
      cel,
      description,
      estudy,
      academy,
      available,
      place_at,
      dt_visible,
      keyword1,
      keyword2,
      keyword3,
      keyword4,
      keyword5,
      userId: id,
      picture,
    });
    res.json(newProfile);
  } catch (error) {
    console.error(error);
  }
};

const getProyect = async (req, res) => {
  try {
    const proyect = await User.findOne({
      include: Proyect,
      where: { id: req.params.id },
    });
    res.json(proyect);
  } catch (error) {
    console.error(error);
  }
};

const updateProyect = async (req, res) => {
  try {
    const { proyectId, title, description, keyword, document } = req.body;
    const proyect = await Proyect.update(
      { title, description, keyword, document },
      { where: { id: proyectId } }
    );
    res.json(proyect);
  } catch (error) {
    console.error(error);
  }
};

const deleteProyect = async (req, res) => {
  try {
    await User.update(
      { proyectId: null },
      { where: { proyectId: req.params.idProyect } }
    );
    await Proyect.destroy({
      where: { id: req.params.idProyect },
    });
  } catch (error) {
    console.error(error);
  }
};

const createProyect = async (req, res) => {
  try {
    const { id, title, description, keyword, document } = req.body;
    const newProyect = await Proyect.create({
      title,
      description,
      keyword,
      document,
    });
    await User.update({ proyectId: newProyect.id }, { where: { id: id } });
    res.json(newProyect);
  } catch (error) {
    console.error(error);
  }
};

const updateUserProyect = async (req, res) => {
  try {
    //console.log(req.body.proyectId);
    const response = await User.update(
      { proyectId: req.body.proyectId },
      { where: { id: req.params.id } }
    );
    res.json(response);
  } catch (error) {
    console.error(error);
  }
};

const updateProfile = async (req, res) => {
  try {
    console.log(req.body, req.file.path);
    const {
      id,
      cel,
      description,
      estudy,
      academy,
      available,
      place_at,
      dt_visible,
      keyword1,
      keyword2,
      keyword3,
      keyword4,
      keyword5,
    } = req.body;

    const response = await Profile.update(
      {
        cel,
        description,
        estudy,
        academy,
        available,
        place_at,
        dt_visible,
        keyword1,
        keyword2,
        keyword3,
        keyword4,
        keyword5,
        picture: req.file.path,
      },
      { where: { id: id } }
    );
    res.json(response);
  } catch (error) {
    console.error(error);
  }
};

const deleteProfile = async (req, res) => {
  try {
    await Profile.destroy({
      where: { id: req.params.idProfile },
    });
  } catch (error) {
    console.error(error);
  }
};

const getPicture = async (req, res) => {
  try {
    //picture-${req.params.id}.png
    const pictures =  []
    let picturesObj = {}
    const picture = fs.readdirSync(`./backend/media/`)
    console.log(picture);
    picture.map((data, i, row)=>{      
      let raw = data.split("-")
      raw = raw[1].split(".")
      const singlePic = fs.readFileSync(`./backend/media/${data}`)
      pictures[raw[0]] = Buffer.from(singlePic).toString("base64")
    })
    Object.assign(picturesObj,pictures)     
    res.send(picturesObj);
  } catch (error) {
    console.error(error);
  }
};

export {
  signUp,
  signIn,
  ping,
  getHome,
  getProfile,
  validateToken,
  createProfile,
  getProyect,
  createProyect,
  updateProyect,
  deleteProyect,
  updateUserProyect,
  updateProfile,
  deleteProfile,
  getPicture
};
