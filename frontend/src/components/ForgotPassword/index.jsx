import axios from "axios";
import { useState } from "react";
import background from '../../assets/background2.jpg';
import styles from "./styles.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `https://ecoconnect-3hx9.onrender.com/api/password-reset`;
      const { data } = await axios.post(url, { email });
      setMsg(data.message);
      setError("");
      setTimeout(() => setMsg(""), 2000);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
        setTimeout(() => setError(""), 1500);
      }
    }
  };

  return (
    <div className={styles.forgot_container} style={{ backgroundImage: `url(${background})` }}>
      <form className={styles.forgot_form_container} onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <div className={styles.line}>
          <p>
            Please enter your email address below, and we will send you the link
            to reset your password
          </p>
        </div>
        <input
          type="email"
          placeholder="Enter Your Valid Email Address"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          className={styles.input}
        />
        {error && <div className={styles.error_msg}>{error}</div>}
        {msg && <div className={styles.success_msg}>{msg}</div>}
        <button
          type="submit"
          className="bg-cyan-950 hover:bg-teal-400 text-white rounded-lg w-96 p-3 font-semibold text-medium cursor-pointer font-sans transition duration-300 ease-in-out hover:text-black mb-6 mt-6"
        >
          Send Password Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
