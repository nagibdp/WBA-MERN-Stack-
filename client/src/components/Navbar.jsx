import React, { useEffect } from "react";
import { useLogin } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useLogin();
  let user = { role: "" };
  if (sessionStorage.getItem("user")) {
    user = JSON.parse(sessionStorage.getItem("user"));
  }

  useEffect(() => {
    const nav = document.querySelector(".header__nav");
    window.addEventListener("scroll", fixNav);

    function fixNav() {
      if (window.scrollY > nav.offsetHeight + 80) {
        nav.classList.add("active");
      } else {
        nav.classList.remove("active");
      }
    }
  }, []);

  function logOut() {
    logout();
    navigate("/login");
  }

  return (
    <header className="header">
      <nav className="header__nav">
        <div className="header__container">
          <h1 className="header__logo">
            <a href={"/home"}>
              <img src="/IPN.png" alt="logoIPN" className="header__logo__img" />
            </a>
          </h1>
          <ul>
            {user.role.includes("teacher") ? (
              <li>
                <a href={`/profile/${user.id}`}>Profile</a>
              </li>
            ) : user.role.includes("student") ? (
              <li>
                <a href={`/proyect`}>Proyect</a>
              </li>
            ) : null}
            {sessionStorage.getItem("token") ? (
              <li onClick={logOut}>
                <a href={"/login"} className="header__list__a--current">
                  Logout
                </a>
              </li>
            ) : null}
            {/* <li>
              <a href={"/home"}>home</a>
            </li> */}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
