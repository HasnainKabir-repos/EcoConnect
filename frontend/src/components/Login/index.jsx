import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
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
      const url = "http://localhost:8080/api/auth";
      const response = await axios.post(url, data);
      // If successful, store the token in local storage and redirect to the home page
      localStorage.setItem("token", response.data);
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
      <div className={styles.login_left_form_container}>
        <div className={styles.login_left}>
          <form className={styles.login_form_container} onSubmit={handleSubmit}>
            <h1>Log In to Your Account</h1>
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
                <Link
                  to="/forgot-password"
                  className={styles.forgotPasswordLink}
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button
              type="submit"
              className="bg-cyan-950 hover:bg-teal-400 text-white rounded-lg w-96 p-3 font-semibold text-medium cursor-pointer font-sans transition duration-300 ease-in-out hover:text-black mt-10"
            >
              Log In
            </button>
          </form>
        </div>
        <div className={styles.login_right}>
          <h1>New to EcoConnect?</h1>
          <Link to="/signup">
            <button
              type="button"
              className="bg-white rounded-lg w-96 p-3 font-semibold text-medium cursor-pointer font-sans transition duration-300 ease-in-out hover:bg-cyan-200 hover:text-black mt-6"
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
