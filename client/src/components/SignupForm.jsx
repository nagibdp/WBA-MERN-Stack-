import { React, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useLogin } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const navigate = useNavigate();
  const [error, setError] = useState({ path: "" });
  const { signup } = useLogin();
  const [user, setUser] = useState({
    name: "",
    lastNameF: "",
    lastNameM: "",
    pass: "",
    email: "",
    career: "default",
    privacy: false,
  });

  useEffect(() => {}, []);

  return (
    <Formik
      initialValues={user}
      enableReinitialize={true}
      onSubmit={async (values) => {
        const res = await signup(values);
        if (res) {
          setError(res);
          setUser({
            name: values.name,
            lastNameF: values.lastNameF,
            lastNameM: values.lastNameM,
            pass: "",
            email: values.email,
            career: values.career,
            privacy: values.privacy,
          });
        } else {
          navigate("/home");
        }
      }}
    >
      {({ handleSubmit, handleChange, isSubmitting, values }) => (
        <Form onSubmit={handleSubmit} className="divRight__formUp">
          <div className="divRight__formUp--inputs">
            <label>Nombre:</label>
            <input
              type="text"
              name="name"
              value={values.name}
              placeholder="Juan"
              onChange={handleChange}
            />
            {error.path.includes("name") ? <div>{error.msg}</div> : null}
            <label>Apellido Paterno:</label>
            <input
              type="text"
              name="lastNameF"
              value={values.lastNameF}
              placeholder="Pérez"
              onChange={handleChange}
            />
            {error.path.includes("lastNameF") ? <div>{error.msg}</div> : null}
            <label>Apellido Materno:</label>
            <input
              type="text"
              name="lastNameM"
              value={values.lastNameM}
              placeholder="Guzman"
              onChange={handleChange}
            />
            {error.path.includes("lastNameM") ? <div>{error.msg}</div> : null}
            <label>Password:</label>
            <input type="password" name="pass" onChange={handleChange} placeholder="****"/>
            {error.path.includes("pass") ? <div>{error.msg}</div> : null}
            <label>Email Institucional:</label>
            <input
              type="email"
              name="email"
              value={values.email}
              placeholder="@alumnoipn.mx / @ipn.mx"
              onChange={handleChange}
            />
            {error.path.includes("email") ? <div>{error.msg}</div> : null}
            <label htmlFor="career">Carrera:</label>
            <select name="career" value={values.career} onChange={handleChange}>
              <option value="default" disabled>
                Elige Carrera
              </option>
              <option value="IC">Ingeniería en Computación</option>
              <option value="ICE">
                Ingeniería en Comunicaciones y Electrónica
              </option>
              <option value="ISISA">Ingeniería en Sistemas Automotrices</option>
              <option value="IM">Ingeniería Mecánica</option>
            </select>
            {error.path.includes("career") ? <div>{error.msg}</div> : null}
            <div className="containerChkBox">
              <label>
                Estoy de acuerdo en proporcionar mis datos personales y que
                estos sean resguardados y no sean compartidos con ningun agente
                externo
              </label>
              <span>
                <input
                  type="checkbox"
                  name="privacy"
                  value={values.privacy}
                  onChange={handleChange}
                  placeholder=""
                />
              </span>
            </div>

            {error.path.includes("privacy") ? <div>{error.msg}</div> : null}
          </div>
          <div className="divRight__formUp--buttons">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registrando..." : "Registrarse"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SignupPage;
