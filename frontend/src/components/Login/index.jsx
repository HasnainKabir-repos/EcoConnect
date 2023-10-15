import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import dispatch from "../../dispatch/dispatch";
import actions from "../../dispatch/actions";
import ContextStore from "../../Context/ContextStore";

const Login = () => {
  const {contextStore, setContextStore} = useContext(ContextStore)
  // State variables for user data, error message, and show/hide password
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Function to handle changes in input fields
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let token = await dispatch(actions.login, {}, data,)
      // If successful, store the token in local storage and redirect to the home page
      localStorage.setItem("token", token);
      setContextStore({...contextStore, token})
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        // If there's an error response from the server, display the error message
        setError(error.response.data.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    }
  };

  // Function to toggle the visibility of the password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1 className={styles.heading}>Log In to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <div className={styles.passwordContainer}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />
              <div className={styles.checkboxContainer}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={showPassword}
                    onChange={toggleShowPassword}
                  />
                  Show Password
                </label>
                <Link to="/forgot-password" className={styles.forgotPasswordLink}>
                  Forgot Password?
                </Link>
              </div>
            </div>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New to EcoConnect?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
