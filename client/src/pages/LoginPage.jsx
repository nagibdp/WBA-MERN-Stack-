import { React, useEffect, useState } from "react";
import { useLogin } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm";
import SinginForm from "../components/SigninForm";

function LoginPage() {
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const { postURL } = useLogin();
  let btnUp;
  let btnIn;

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      navigate("/home");
    }
    /*  const btn = document.querySelector(".btnSignin");
    btn.classList.add()
 */
  }, []);

  const signUp = () => {
    btnUp = document.querySelector(".btnSignup");
    btnIn = document.querySelector(".btnSignin");
    console.log(btnIn, btnUp);
    //navigate("/login/signup");
    setRegister(true);
    btnIn.classList.remove("selected");
    btnUp.classList.add("selected");
    //return <SignupPage />
  };

  const signIn = () => {
    btnUp = document.querySelector(".btnSignup");
    btnIn = document.querySelector(".btnSignin");
    console.log(btnIn, btnUp);
    setRegister(false);
    btnUp.classList.remove("selected");
    btnIn.classList.add("selected");
  };

  const URL = async () => {
    const token = sessionStorage.getItem("token");
    const res = await postURL("/validateToken", { token: token });
    if (res.data == true) {
      navigate("/home");
    } else {
      console.log(res.data.error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="container__divLeft">
          <img src="./fondo.png" alt="LoginImage" />
        </div>
        <div className="container__divRight">
          <div className="divRight__divH1">
            <h1>
              <div className="divRight__divH1__divBtn1">
                <button onClick={signIn} className="btnSignin selected">
                  <b>S</b>ing In
                </button>
              </div>
              <span>|</span>
              <div className="divRight__divH1__divBtn2">
                <button onClick={signUp} className="btnSignup">
                  <b>S</b>ign Up
                </button>
              </div>
            </h1>
          </div>
          {register ? <SignupForm /> : <SinginForm />}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
