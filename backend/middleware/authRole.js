import { verifyToken } from "../helpers/generateToken.js";
import User from "../models/user.js";

export const checkRoleAuth = (role) => {
  return async (req, res, next) => {
    try {
      const token = req.body.token;
      const tokenData = await verifyToken(token);
      const userData = await User.findByPk(tokenData._id);
      if (role.includes(userData.role)) {
        next();
      } else {
        //res.status(409);
        res.send({ error: "No tienes permisos para acceder a esta pagina 3" });
        //return;
      }
    } catch (error) {
      //res.status(409);
      res.send({ error: "No tienes permisos para acceder a esta pagina 4" });
      //return;
    }
  };
};
