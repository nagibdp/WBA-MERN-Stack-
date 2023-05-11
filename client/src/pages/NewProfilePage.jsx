import { React, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useLogin } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

function NewProfilePage() {
  const { createProfile, edit, updateProfile, profile } = useLogin();
  const navigate = useNavigate();
  const id = JSON.parse(sessionStorage.getItem("user"));
  const [profileForm, setProfileForm] = useState({
    id: id.id,
    cel: "",
    description: "",
    estudy: "",
    academy: "",
    available: false,
    place_at: "",
    dt_visible: false,
    keyword1: "",
    keyword2: "",
    keyword3: "",
    keyword4: "",
    keyword5: "",
    picture: "",
  });

  useEffect(() => {}, []);

  return (
    <div>
      <h1>{edit ? "Editar Perfil" : "Nuevo Perfil"}</h1>

      <Formik
        initialValues={profile.length === 0 ? profileForm: profile}
        enableReinitialize={true}
        onSubmit={async (values) => {
          //console.log(values)
          if (edit) {
            await updateProfile(values)
          } else {
            await createProfile(values);
          }
          navigate(`/profile/${id.id}`);
          //console.log(values);
        }}
      >
        {({ handleSubmit, handleChange, isSubmitting, values, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <label>Celular:</label>
            <input
              type="tel"
              name="cel"
              defaultValue={edit ? values.cel : null}
              onChange={handleChange}
            />
            <label>Descripción:</label>
            <input
              type="text"
              name="description"
              defaultValue={edit ? values.description : null}
              onChange={handleChange}
            />
            <label>Estudios:</label>
            <input
              type="text"
              name="estudy"
              defaultValue={edit ? values.estudy : null}
              onChange={handleChange}
            />
            <label>Academia:</label>
            <select
              name="academy"
              defaultValue="default"
              onChange={handleChange}
            >
              <option value="default" disabled>
                Elige Academia
              </option>
              <option value="CE">Comunicaciones y electronica</option>
              <option value="I">Informatica</option>
              <option value="MP">Micro procesadores</option>
              <option value="IS">Ingenieria y sociedad</option>
              <option value="MF">Matematicas y fisica</option>
              <option value="C">Computacion</option>
              <option value="Q">Quimica</option>
            </select>
            <label>Disponible:</label>
            <input
              type="checkbox"
              name="available"
              defaultValue={edit ? values.available : null}
              onChange={handleChange}
            />
            <label>Lugar de atención:</label>
            <input
              type="text"
              name="place_at"
              defaultValue={edit ? values.place_at : null}
              onChange={handleChange}
            />
            <label>Foto:</label>
            <input
              type="file"
              name="picture"
              onChange={(event)=>{
                setFieldValue("picture", event.target.files[0])
              }}
            />
            <label>Datos visibles:</label>
            <input
              type="checkbox"
              name="dt_visible"
              defaultValue={edit ? values.dt_visible : null}
              onChange={handleChange}
            />
            <label>Palabra clave 1:</label>
            <input
              type="text"
              name="keyword1"
              defaultValue={edit ? values.keyword1 : null}
              onChange={handleChange}
            />
            <label>Palabra clave 2:</label>
            <input
              type="text"
              name="keyword2"
              defaultValue={edit ? values.keyword2 : null}
              onChange={handleChange}
            />
            <label>Palabra clave 3:</label>
            <input
              type="text"
              name="keyword3"
              defaultValue={edit ? values.keyword3 : null}
              onChange={handleChange}
            />
            <label>Palabra clave 4:</label>
            <input
              type="text"
              name="keyword4"
              defaultValue={edit ? values.keyword4 : null}
              onChange={handleChange}
            />
            <label>Palabra clave 5:</label>
            <input
              type="text"
              name="keyword5"
              defaultValue={edit ? values.keyword5 : null}
              onChange={handleChange}
            />            
            <button type="submit" disabled={isSubmitting}>
            {isSubmitting
                ? edit
                  ? "Editando..."
                  : "Creando..."
                : edit
                ? "Editar"
                : "Crear"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default NewProfilePage;
