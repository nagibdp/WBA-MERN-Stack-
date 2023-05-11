import { verifyToken } from "../helpers/generateToken.js";

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.body.token;
    const tokenData = await verifyToken(token);
    if (tokenData._id) {
      next();
    } else {
      //res.status(409);
      res.send({ error: "No tienes permisos para acceder a esta pagina 1" });
      //return;
    }
  } catch (error) {
    //res.status(409);
    res.send({ error: "No tienes permisos para acceder a esta pagina 2" });
    //return;
  }
};
