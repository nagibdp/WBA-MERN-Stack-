import { Router } from "express";
import {
  signIn,
  signUp,
  ping,
  getProfile,
  getHome,
  validateToken,
  createProfile,
  getProyect,
  createProyect,
  updateProyect,
  deleteProyect,
  updateUserProyect,
  updateProfile,
  deleteProfile,
  getPicture,
} from "../controllers/login-controller.js";
import { checkAuth } from "../middleware/authJWT.js";
import { checkRoleAuth } from "../middleware/authRole.js";
import { validateCreate } from "../validators/userValidator.js";
import { validateCreateProfile } from "../validators/profileValidator.js";
import multer from "multer";
import fs from "fs";

//const upload = multer({storage:multer.memoryStorage()})
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./backend/media/");
  },
  filename: function (req, file, cb) {
    try {
      fs.unlinkSync(`./backend/media/picture-${req.params.id}.png`);
      cb(null, file.fieldname + "-" + `${req.params.id}` + ".png");
    } catch (error) {
      cb(null, file.fieldname + "-" + `${req.params.id}` + ".png");
    }
  },
});
const upload = multer({ storage: storage });
const router = Router();

//checkRoleAuth(["student"])

router.post("/validateToken", checkAuth, validateToken);
router.get("/home", getHome);
router.post("/login/signup", validateCreate, signUp);
router.post("/login", signIn);
router.get("/profile/:id", getProfile);
router.post("/profile/new", createProfile);
router.put("/profile/update/:id", upload.single("picture"), updateProfile);
router.delete("/profile/delete/:idProfile", deleteProfile);
router.get("/proyect/:id", getProyect);
router.get("/picture", getPicture);
router.put("/proyect/:id", updateProyect);
router.put("/proyect/join/:id", updateUserProyect);
router.delete("/proyect/:idUser/:idProyect", deleteProyect);
router.post("/proyect/new", createProyect);
router.get("/ping", ping);

export default router;
