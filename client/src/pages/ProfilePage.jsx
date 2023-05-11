import React, { useEffect } from "react";
import { useLogin } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import Profile from "../components/Profile";

function ProfilePage() {
  const { profile, setProfile, getProfile, createProfile, getPicture } = useLogin();
  const navigate = useNavigate();
  const href = window.location.href.split("/");
  const user = { id: href[href.length - 1] };
  const userSession = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    getProfile(user.id);
    getPicture();
  }, []);

  const newProfile = () => {
    navigate("/profile/new");
  };

  function renderMain() {
    if (profile.length == 0) {
      return (
        <div>
          <h2>No hay perfil disponible</h2>
          {user.id == userSession.id ? (
            <button onClick={newProfile}>Crear perfil</button>
          ) : null}
        </div>
      );
    }
    return <Profile profile={profile} link={false} user={user} userSession={userSession}/>;
  }

  return (
    <div>
      <div className="profileCont">
        <div className="profileCont__divTitle">
          <h1>Perfil</h1>
        </div>
        <div className="profileCont__divMain">
          {renderMain()}
        </div>        
      </div>
    </div>
  );
}

export default ProfilePage;
