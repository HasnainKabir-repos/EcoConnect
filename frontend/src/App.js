import { Navigate, Route, Routes } from "react-router-dom";
import EditProfile from "./components/EditProfile";
import Events from "./components/Events";
import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import Main from "./components/Main";
import MyEvent from "./components/My_Event";
import PasswordReset from "./components/PasswordReset";
import PostEvent from "./components/PostEvent";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import Community from "./components/Community";

function App() {
  const user = localStorage.getItem("token");

  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      {user && <Route path="/profile" exact element={<Profile />} />}
      {user && <Route path="/editprofile" exact element={<EditProfile />} />}
      {user && <Route path="/postevent" exact element={<PostEvent />} />}
      {user && <Route path="/events" exact element={<Events />} />}
      {user && <Route path="/myevent" exact element={<MyEvent />} />}
      {user && <Route path="/community" exact element={<Community />} />}
      {user && <Route path="/login" element={<Navigate replace to="/" />} />}
      {user && <Route path="/signup" element={<Navigate replace to="/" />} />}

      {!user && <Route path="/signup" exact element={<Signup />} />}
      {!user && <Route path="/login" exact element={<Login />} />}

      {!user && <Route path="/forgot-password" element={<ForgotPassword />} />}
      {!user && (
        <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
      )}

      {!user && <Route path="/" element={<Navigate replace to="/login" />} />}
      {!user && (
        <Route path="/profile" element={<Navigate replace to="/login" />} />
      )}
      {!user && (
        <Route path="/editprofile" element={<Navigate replace to="/login" />} />
      )}
      {!user && (
        <Route path="/postevent" element={<Navigate replace to="/login" />} />
      )}
      {!user && (
        <Route path="/events" element={<Navigate replace to="/login" />} />
      )}
      {!user && (
        <Route path="/myevent" element={<Navigate replace to="/login" />} />
      )}
      {!user && (
        <Route path="/community" element={<Navigate replace to="/login" />} />
      )}
    </Routes>
  );
}

export default App;
