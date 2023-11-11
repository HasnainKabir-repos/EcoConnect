import { Navigate, Route, Routes } from "react-router-dom";
import EditProfile from "./components/EditProfile";
import Events from "./components/Events";
import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import Main from "./components/Main";
import My_Event from "./components/My_Event";
import PasswordReset from "./components/PasswordReset";
import PostEvent from "./components/PostEvent";
import Profile from "./components/Profile";
import Signup from "./components/Signup";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      {user && <Route path="/profile" exact element={<Profile />} />}
      {user && <Route path="/editprofile" exact element={<EditProfile />} />}
      {user && <Route path="/postevent" exact element={<PostEvent />} />}
      {user && <Route path="/events" exact element={<Events />} />}
      {user && <Route path="/myevent" exact element={<My_Event />} />}

      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
      <Route path="/profile" exact element={<Navigate replace to="/login" />} />
      <Route path="/editprofile" exact element={<Navigate replace to="/login" />} />
      <Route path="/postevent" exact element={<Navigate replace to="/login" />} />

      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/profile" element={<Navigate replace to="/login" />} />
      <Route path="/events" element={<Navigate replace to="/login" />} />
      <Route path="/myevent" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
