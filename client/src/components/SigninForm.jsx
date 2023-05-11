import { React, useEffect, useState } from "react";
import { useLogin } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";

function SigninForm() {
  const navigate = useNavigate();
  const { signin } = useLogin();
  const [error, setError] = useState("");
  const [login, setLogin] = useState({
    email: "",
    pass: "",
  });

  return (
    <Formik
      enableReinitialize={true}
      initialValues={login}
      onSubmit={async (values) => {
        const res = await signin(values);
        if (res) {
          setError(res);
          setLogin({ email: values.email, pass: "" });
        } else {
          navigate("/home");
          //URL();
        }
      }}
    >
      {({ handleSubmit, handleChange, isSubmitting, values }) => (
        <Form onSubmit={handleSubmit} className="divRight__form"> 
          <div className="divRight__form--inputs">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={values.email}
              placeholder="Ingrese su email institucional"
              onChange={handleChange}
            />
            {error.includes("Email") ? <div>{error}</div> : null}

            <label>Password:</label>
            <input
              type="password"
              name="pass"
              value={values.pass}
              placeholder="Ingrese su contraseña"
              onChange={handleChange}
            />
            {error.includes("Contraseña") ? <div>{error}</div> : null}
          </div>
          <div className="divRight__form--buttons">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Ingresando..." : "Ingresar"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SigninForm;
