import axios from "axios";

export const postUrl = async (URL, req) =>
  await axios.post(`http://localhost:4000${URL}`, req);

export const createSignupRequest = async (user) =>
  await axios.post("http://localhost:4000/login/signup", user);

export const createSigninRequest = async (login) =>
  await axios.post("http://localhost:4000/login", login);

export const getHomeRequest = async () =>
  await axios.get("http://localhost:4000/home");

export const getProfileRequest = async (id) =>
  await axios.get(`http://localhost:4000/profile/${id}`);

export const createProfileRequest = async (profile) =>
  await axios.post("http://localhost:4000/profile/new", profile);

export const getProyectRequest = async (id) =>
  await axios.get(`http://localhost:4000/proyect/${id}`);

export const createProyectRequest = async (proyect) =>
  await axios.post("http://localhost:4000/proyect/new", proyect);

export const updateProyectRequest = async (id, req) =>
  await axios.put(`http://localhost:4000/proyect/${id}`, req);

export const deleteProyectRequest = async (idUser, idProyect) =>
  await axios.delete(`http://localhost:4000/proyect/${idUser}/${idProyect}`);

export const updateUserProyectRequest = async (id, req) =>
  await axios.put(`http://localhost:4000/proyect/join/${id}`, req);

export const updateProfileRequest = async (userId, req) =>
  await axios.put(`http://localhost:4000/profile/update/${userId}`, req, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deleteProfileRequest = async (idProfile) =>
  await axios.delete(`http://localhost:4000/profile/delete/${idProfile}`);

export const getPictureRequest = async () =>
  await axios.get(`http://localhost:4000/picture`);
