import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./styles.module.css";

const PasswordReset = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const param = useParams();
  const url = `http://localhost:8080/api/password-reset/${param.id}/${param.token}`;

  useEffect(() => {
    const verifyUrl = async () => {
      try {
        await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [param, url]);

  const handleChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const strength = assessPasswordStrength(newPassword);
    setPasswordStrength(strength);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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

   const getPasswordStrengthSymbol = (strength) => {
    if (strength === "Weak") {
      return "🟥";
    } else if (strength === "Medium") {
      return "🟨";
    } else if (strength === "Strong") {
      return "🟩";
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(url, { password });
      setMsg(data.message);
      setError("");
      window.location = "/login";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
    }
  };

  return (
    <Fragment>
      {validUrl ? (
        <div className={styles.container}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Reset Password</h1>
            <div className={styles.line}>
              <p>Put Your New Password Below to continue with EcoConnect!</p>
            </div>
            <input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              placeholder="Enter Your New Password"
              name="password"
              onChange={handleChange}
              value={password}
              required
              className={styles.input}
            />
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
            <div className={styles.passwordStrengthContainer}>
              {password && (
                <span className={styles.passwordStrengthSymbol}>
                  {getPasswordStrengthSymbol(passwordStrength)}
                </span>
              )}
              {password && (
                <span className={styles.passwordStrengthText}>
                  Password Strength: {passwordStrength}
                </span>
              )}
            </div>
            {error && <div className={styles.error_msg}>{error}</div>}
            {msg && <div className={styles.success_msg}>{msg}</div>}
            <button type="submit" className={styles.green_btn}>
              Confirm Password Reset
            </button>
          </form>
        </div>
      ) : (
        <h1>404 Not Found</h1>
      )}
    </Fragment>
  );
};

export default PasswordReset;
