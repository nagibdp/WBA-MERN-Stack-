import React from "react";
import { useLogin } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

function Proyect({ proyect }) {
  const { deleteProyect, setEdit } = useLogin();
  const navigate = useNavigate();

  function editProyect() {
    setEdit(true);
    navigate("/proyect/new");
  }
  function eraseProyect() {
    deleteProyect(proyect);
    window.location.reload(false);
  }

  return (
    <div>
      <div className="containerProyect">
        <div className="containerProyect__divLeft"></div>
        <div className="containerProyect__divRight">
          <div className="containerProyect__divRight--text">
            <h2>
              #{proyect.proyect.id} {proyect.proyect.title}
            </h2>
            <p>{proyect.proyect.description}</p>
            <p># {proyect.proyect.keyword}</p>
          </div>
          <div className="containerProyect__divRight--buttons">
            <button onClick={editProyect}>Edit</button>
            <button onClick={eraseProyect}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Proyect;
