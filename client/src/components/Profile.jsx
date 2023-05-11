import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";

function Profile({ profile, link = true, user, userSession }) {
  const { setEdit, deleteProfile, getPicture, picture } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const editProfile = () => {
    setEdit(true);
    navigate("/profile/new");
  };

  const eraseProfile = () => {
    deleteProfile(profile);
    window.location.reload(false);
  };

  return (
    <div>
      <a
        href={link ? `/profile/${profile.user.id}` : null}
        className="aContainer"
      >
        <div className="aContainer__divIMGMother">
          <div className="aContainer__divIMGMother__divChild">
            {picture[profile.user.id] ? (
              <img
                src={`data:image/png;base64,${picture[profile.userId]}`}
                alt="Profile Picture"
              />
            ) : null}
          </div>
        </div>

        <div className="aContainer__divText">
          <h2>
            {profile.user.name +
              " " +
              profile.user.lastNameF +
              " " +
              profile.user.lastNameM}
          </h2>
          <p>{profile.description}</p>
          <p>{profile.estudy}</p>
          <p>
            {profile.academy == "CE"
              ? "Comunicaciones y electronica"
              : profile.academy == "I"
              ? "Informatica"
              : profile.academy == "MP"
              ? "Micro procesadores"
              : profile.academy == "IS"
              ? "Ingenieria y sociedad"
              : profile.academy == "MF"
              ? "Matematicas y fisica"
              : profile.academy == "C"
              ? "Computacion"
              : profile.academy == "Q"
              ? "Computacion"
              : null}
          </p>
          <p>
            {"#" +
              profile.keyword1 +
              " " +
              "#" +
              profile.keyword2 +
              " " +
              "#" +
              profile.keyword3 +
              " " +
              "#" +
              profile.keyword4 +
              " " +
              "#" +
              profile.keyword5}
          </p>
        </div>
      </a>
      {link ? null : user.id == userSession.id ? (
        <div className="buttonsCont">
          <button onClick={editProfile}>Editar perfil</button>
          <button onClick={eraseProfile}>Eliminar perfil</button>
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
