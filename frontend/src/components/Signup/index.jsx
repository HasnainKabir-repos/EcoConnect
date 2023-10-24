import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SignupImage from "../../assets/SignupImage.png";
import background from "../../assets/background3.jpg";
import styles from "./styles.module.css";

const Signup = () => {
  // State variables for form data, password strength, current password, error, and show password
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [passwordStrength, setPasswordStrength] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Function to handle input changes in the form
  const handleChange = ({ currentTarget: input }) => {
    const newPassword = input.value;
    setData({ ...data, [input.name]: newPassword });

    // Set the current password and check password strength
    setCurrentPassword(newPassword);
    const strength = assessPasswordStrength(newPassword);
    setPasswordStrength(strength);
  };

  // Function to assess password strength based on criteria
  const assessPasswordStrength = (password) => {
    const hasSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/\-=]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    const characterTypes = [hasSymbol, hasLowercase, hasUppercase, hasNumber];
    const presentTypesCount = characterTypes.filter((type) => type).length;

    if (presentTypesCount >= 4) {
      return "Strong";
    } else if (presentTypesCount === 3) {
      return "Medium";
    } else {
      return "Weak";
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setTimeout(() => {
          setError("");
        }, 1500);
      }
    }
  };

  // Function to toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Function to get the password strength symbol (Unicode)
  const getPasswordStrengthSymbol = (strength) => {
    if (strength === "Weak") {
      return "🟥";
    } else if (strength === "Medium") {
      return "🟨";
    } else if (strength === "Strong") {
      return "🟩";
    }
  };

  return (
    <div
      className={styles.signup_container}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className={styles.signup_left_form_container}>
        <div className={styles.signup_left}>
          <h1>Welcome to EcoConnect</h1>
          <img src={SignupImage} alt="Signup" className={styles.signupImage} />
          <Link to="/login">
            <button
              type="button"
              className="bg-white rounded-lg w-96 p-3 font-semibold text-medium cursor-pointer font-sans transition duration-300 ease-in-out hover-bg-cyan-200 hover-text-black"
            >
              Log In
            </button>
          </Link>
        </div>
        <div className={styles.signup_right}>
          <form
            className={styles.signup_right_form_container}
            onSubmit={handleSubmit}
          >
            <h1>Create Account</h1>

            {/* Input fields for first name, last name, email, and password */}
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
              id="passwordInput"
            />

            {/* Checkbox to show/hide password */}
            <div className={styles.checkboxContainer}>
              <label htmlFor="passwordInput" className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={showPassword}
                  onChange={toggleShowPassword}
                />
                Show Password
              </label>
            </div>

            {/* Display password strength and symbol only when input is given in the password field */}
            <div className={styles.passwordStrengthContainer}>
              {data.password && (
                <span className={styles.passwordStrengthSymbol}>
                  {getPasswordStrengthSymbol(passwordStrength)}
                </span>
              )}
              {data.password && (
                <span className={styles.passwordStrengthText}>
                  Password Strength: {passwordStrength}
                </span>
              )}
            </div>

            {/* Display error message if there's an error */}
            {error && <div className={styles.error_msg}>{error}</div>}

            {/* Submit button */}
            <button
              type="submit"
              className="bg-cyan-950 hover-bg-teal-400 text-white rounded-lg w-96 p-3 font-semibold text-medium cursor-pointer font-sans transition duration-300 ease-in-out hover-text-black mt-6"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
