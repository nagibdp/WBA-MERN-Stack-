import { createContext, useContext, useState } from "react";
import {
  createSignupRequest,
  createSigninRequest,
  postUrl,
  getHomeRequest,
  getProfileRequest,
  createProfileRequest,
  getProyectRequest,
  createProyectRequest,
  updateProyectRequest,
  deleteProyectRequest,
  updateUserProyectRequest,
  updateProfileRequest,
  deleteProfileRequest,
  getPictureRequest,
} from "../api/wbaAPI.js";

const LoginContext = createContext();

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin must be used within a LoginContextProvider");
  }
  return context;
};

export const LoginContextProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [profile, setProfile] = useState([]);
  const [proyect, setProyect] = useState([]);
  const [edit, setEdit] = useState(false);
  const [picture, setPicture] = useState([]);
  const signin = async (login) => {
    try {
      const register = await createSigninRequest(login);
      if (register.data.tokenSession) {
        sessionStorage.setItem("user", JSON.stringify(register.data.data));
        sessionStorage.setItem("token", register.data.tokenSession);
      }
    } catch (error) {
      return error.response.data.error;
    }
  };

  const signup = async (user) => {
    try {
      const register = await createSignupRequest(user);
    } catch (error) {
      return error.response.data.error[0];
    }
  };

  const logout = async () => {
    try {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    } catch (error) {
      console.error(error);
    }
  };

  const postURL = async (url, req) => {
    try {
      const err = await postUrl(url, req);
      return err;
    } catch (error) {
      console.log(error);
    }
  };

  const getHome = async (req, res) => {
    try {
      const response = await getHomeRequest();
      setProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProfile = async (req, res) => {
    try {
      const response = await getProfileRequest(req);
      if (response.data) setProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createProfile = async (req, res) => {
    try {
      await createProfileRequest(req);
    } catch (error) {
      console.log(error);
    }
  };

  const getProyect = async (req, res) => {
    try {
      const response = await getProyectRequest(req);
      if (response.data) setProyect(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createProyect = async (req, res) => {
    try {
      await createProyectRequest(req);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProyect = async (req, res) => {
    try {
      await updateProyectRequest(req.userId, req);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProyect = async (req, res) => {
    try {
      await deleteProyectRequest(req.id, req.proyect.id);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserProyect = async (req, res) => {
    try {
      //console.log(req)
      await updateUserProyectRequest(req.id, req);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async (req, res) => {
    try {
      //console.log(req.userId)
      await updateProfileRequest(req.userId, req);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProfile = async (req, res) => {
    try {
      //console.log(req)
      await deleteProfileRequest(req.id);
    } catch (error) {
      console.log(error);
    }
  };

  const getPicture = async (req, res) => {
    try {
      let base64 = await getPictureRequest();
      if (base64.data) setPicture(base64.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginContext.Provider
      value={{
        signin,
        signup,
        postURL,
        logout,
        getHome,
        profiles,
        setProfiles,
        profile,
        setProfile,
        getProfile,
        createProfile,
        getProyect,
        createProyect,
        proyect,
        setProyect,
        updateProyect,
        deleteProyect,
        edit,
        setEdit,
        updateUserProyect,
        updateProfile,
        deleteProfile,
        getPicture,
        picture,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
