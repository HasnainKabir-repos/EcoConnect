import axios from "axios";
import { useContext, useState } from "react";
import styles from "./styles.module.css";
import ContextStore from "../../Context/ContextStore";

const ForgotPassword = () => {
  const {contextStore, setContextStore} = useContext(ContextStore)
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  console.log(contextStore)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:8080/api/password-reset`;
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
    <div className={styles.container}>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <div className={styles.line}>
          <p>
            Please enter your email address below, and we will send you
            the link to reset your password
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
        <button type="submit" className={styles.green_btn}>
          Send Password Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
