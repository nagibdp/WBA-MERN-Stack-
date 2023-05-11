import { check } from "express-validator";
import { validateResult } from "../helpers/validateHelper.js";

export const validateCreateProfile = [
  check("cel").exists().not().isEmpty(),
  check("description").exists().not().isEmpty(),
  check("estudy").exists().not().isEmpty(),
  check("academy").exists().not().isEmpty(),
  check("available").exists().isEmail().not().isEmpty(),
  check("place_at").exists(),
  check("dt_visible").exists(),
  check("place_at").exists(),
  check("place_at").exists(),
  check("place_at").exists(),
  check("place_at").exists(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];
