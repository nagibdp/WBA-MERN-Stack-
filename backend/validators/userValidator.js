import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelper.js";

export const validateCreate = [
  check("name").exists().not().isEmpty(),
  check("lastNameF").exists().not().isEmpty(),
  check("lastNameM").exists().not().isEmpty(),
  check("pass").exists().not().isEmpty(),
  check("email").exists().isEmail().not().isEmpty(),
  check("career").exists(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
