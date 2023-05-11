import React, { useState } from "react";
import { useLogin } from "../context/LoginContext";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";

function ProyectModal({ idModal, modalIsOpen, setIsOpen, userSession }) {
  const { updateUserProyect } = useLogin();
  //const navigate = useNavigate();
  const [proyectId, setProyectId] = useState({
    id: userSession.id,
    proyectId: "default",
  });

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  Modal.setAppElement(idModal);

  let subtitle;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    //subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Formik
          initialValues={proyectId}
          enableReinitialize={true}
          onSubmit={async (values) => {
            await updateUserProyect(values);
            window.location.reload(false);
          }}
        >
          {({ handleSubmit, handleChange, isSubmitting, values }) => (
            <form onSubmit={handleSubmit}>
              <label>Código de proyecto</label>
              <input type="number" name="proyectId" onChange={handleChange} />
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Agregando..." : "Agregar"}
              </button>
            </form>
          )}
        </Formik>
        <button onClick={closeModal}>close</button>
      </Modal>
    </div>
  );
}

export default ProyectModal;
