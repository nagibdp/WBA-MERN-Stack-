import React, { useEffect, useState } from "react";
import { useLogin } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import Proyect from "../components/Proyect";
import ProyectModal from "../components/ProyectModal";

function ProyectPage() {
  const navigate = useNavigate();
  const { proyect, getProyect, updateUserProyect } = useLogin();
  const userSession = JSON.parse(sessionStorage.getItem("user"));
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getProyect(userSession.id);
  }, []);

  const newProyect = () => {
    navigate("/proyect/new");
  };

  const joinProyect = () => {
    //updateUserProyect(userSession.id, {proyectId:5})
    //window.location.reload(false)
    setIsOpen(true);
  };

  function renderMain() {
    if (proyect.proyect == null) {
      return (
        <div>
          <h2>No hay proyecto disponible</h2>
          <button onClick={newProyect}>Crear proyecto</button>
          <button onClick={joinProyect}>Unirse a proyecto</button>
          <div id="proyectModal"></div>
          <ProyectModal
            idModal={document.getElementById("proyectModal")}
            modalIsOpen={modalIsOpen}
            setIsOpen={setIsOpen}
            userSession={userSession}
          />
          ;
        </div>
      );
    }
    return <Proyect proyect={proyect} />;
  }

  return (
    <div>
      <div className="containerPageProyect">
        <div className="containerPageProyect__title">
          <h1>Proyecto</h1>
        </div>
        <div className="containerPageProyect__main">
          {renderMain()}
        </div>
      </div>
    </div>
  );
}

export default ProyectPage;
