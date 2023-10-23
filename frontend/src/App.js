import { Navigate, Route, Routes } from "react-router-dom";
import EditProfile from "./components/EditProfile";
import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import Main from "./components/Main";
import PasswordReset from "./components/PasswordReset";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
      <Route path="/profile" exact element={<Profile />} />
      <Route path="/editprofile" exact element={<EditProfile />} />
    </Routes>
  );
}

export default App;
