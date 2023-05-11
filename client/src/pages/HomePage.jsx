import React, { useEffect } from "react";
import { useLogin } from "../context/LoginContext";
import Profile from "../components/Profile";

function HomePage() {
  const { getHome, profiles, getPicture } = useLogin();

  useEffect(() => {
    getHome();
    getPicture();
  }, []);

  function renderMain() {
    if (profiles.length == 0) return <h2>No hay perfiles aun</h2>;
    return profiles.map((profile) => (
      <Profile profile={profile} key={profile.user.id} />
    ));
  }

  return (
    <div>
      <div className="containerHome">
        <div className="container__divSearch">
          <div className="container__divSearch__left">
            <img src="./ESIME.png" alt="ESIMELogo" />
            <h4>
              Sitio web para la busqueda de asesor en la <br /> carrerea de
              Ingenieria en computación
            </h4>
          </div>
          <div className="container__divSearch__rigth">
            <small>Burcar por nomre o palabra clave</small>
            <input type="text" placeholder="Buscar" />
          </div>
        </div>
      </div>
      {renderMain()}
    </div>
  );
}

export default HomePage;
