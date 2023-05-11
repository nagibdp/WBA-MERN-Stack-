import { Navigate, Outlet } from "react-router-dom";
import { useLogin } from "../context/LoginContext";
import ProyectPage from "../pages/ProyectPage";
import NewProyectPage from "../pages/NewProyectPage";
import { useEffect } from "react";

export const ProtectedRoute = ({ children, user = "default" }) => {
  const { postURL } = useLogin();
  const token = sessionStorage.getItem("token");
  const userSession = JSON.parse(sessionStorage.getItem("user"));

  if (token) {
    postURL("/validateToken", { token: token }).then((val) => {
      if (val.data !== true) {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        window.location.reload(false);
      }
    });
    if (!user.includes(userSession.role)) {
      return <Navigate to={"/home"} />;
    }
    return children ? children : <Outlet />;
  }
  return <Navigate to={"/login"} />;
};

export const ProtectedLogin = ({ children }) => {
  const token = sessionStorage.getItem("token");
  const userSession = JSON.parse(sessionStorage.getItem("user"));

  if (token && userSession) {
    return <Navigate to={"/home"} />;
  }
  return children ? children : <Outlet />;
};

export const ProtectedNewProyect = ({ children }) => {
  const { proyect, getProyect, edit } = useLogin();
  const userSession = JSON.parse(sessionStorage.getItem("user"));
  useEffect(() => {
    getProyect(userSession.id);
  }, []);
  if (proyect.proyect !== null) {
    if (edit) {
      return children;
    }
    return <Navigate to={"/proyect"} />;
  }
  return children;
};

export const ProtectedNewProfile = ({ children }) => {
  const { profile, getProfile, edit } = useLogin();
  const userSession = JSON.parse(sessionStorage.getItem("user"));
  useEffect(() => {
    getProfile(userSession.id);
  }, []);
  if (profile.length !== 0) {
    if (edit) {
      return children;
    }
    return <Navigate to={`/profile/${userSession.id}`} />; 
  }
  return children;
};