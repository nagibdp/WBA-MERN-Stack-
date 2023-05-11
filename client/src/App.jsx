import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import NewProfilePage from "./pages/NewProfilePage";
import ProyectPage from "./pages/ProyectPage";
import NewProyectPage from "./pages/NewProyectPage";
import {
  ProtectedLogin,
  ProtectedNewProyect,
  ProtectedRoute,
  ProtectedNewProfile,
} from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* ---------------------- Rutas públicas ---------------------- */}
        <Route element={<ProtectedLogin />}>
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/login/signup" element={<SignupPage />} /> */}
        </Route>
        <Route path="*" element={<NotFound />} />

        {/* ---------------------- Rutas compartidas ---------------------- */}
        <Route element={<ProtectedRoute user={["teacher", "student"]} />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
        </Route>

        {/* ---------------------- Rutas "teacher" ---------------------- */}
        <Route element={<ProtectedRoute user={["teacher"]} />}>
          <Route
            path="/profile/new"
            element={
              <ProtectedNewProfile>
                <NewProfilePage />
              </ProtectedNewProfile>
            }
          />
        </Route>

        {/* ---------------------- Rutas "student" ---------------------- */}
        <Route element={<ProtectedRoute user={["student"]} />}>
          <Route path="/proyect" element={<ProyectPage />} />
          <Route
            path="/proyect/new"
            element={
              <ProtectedNewProyect>
                <NewProyectPage />
              </ProtectedNewProyect>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
