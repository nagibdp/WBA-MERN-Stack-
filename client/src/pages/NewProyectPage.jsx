import { React, useEffect } from "react";
import { Form, Formik } from "formik";
import { useLogin } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

function NewProyectPage() {
  const { createProyect, edit, updateProyect, proyect } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <div>
      {edit ? <h1>Editar Proyecto</h1> : <h1>Nuevo Proyecto</h1>}
      <Formik
        initialValues={proyect}
        enableReinitialize={true}
        onSubmit={async (values) => {
          if (edit) {
            await updateProyect({
              userId: values.id,
              proyectId: values.proyect.id,
              title: values.title ? values.title : values.proyect.title,
              description: values.description
                ? values.description
                : values.proyect.description,
              keyword: values.keyword ? values.keyword : values.proyect.keyword,
              document: values.document
                ? values.document
                : values.proyect.document,
            });
            navigate("/proyect");
          } else {
            await createProyect({
              id: values.id,
              title: values.title ? values.title : "",
              description: values.description ? values.description : "",
              keyword: values.keyword ? values.keyword : "",
              document: values.document ? values.document : "",
            });
            navigate("/proyect");
          }
        }}
      >
        {({ handleSubmit, handleChange, isSubmitting, values }) => (
          <Form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              defaultValue={edit ? values.proyect.title : null}
              onChange={handleChange}
            />
            <label>Descripción:</label>
            <input
              type="text"
              name="description"
              defaultValue={edit ? values.proyect.description : null}
              onChange={handleChange}
            />
            <label>Keyword:</label>
            <input
              type="text"
              name="keyword"
              defaultValue={edit ? values.proyect.keyword : null}
              onChange={handleChange}
            />
            <label>Documento:</label>
            <input
              type="file"
              name="document"
              defaultValue={edit ? values.proyect.document : null}
              onChange={handleChange}
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? edit
                  ? "Cambiando..."
                  : "Creando..."
                : edit
                ? "Cambiar"
                : "Crear"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default NewProyectPage;
