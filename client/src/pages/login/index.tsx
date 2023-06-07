import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { loginValidator } from "../../utils/validators";

import styles from "../signup/index.module.css";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.bg}>
      <div className={styles.wrapper}>
        <div className="logo">
          <img src="/vite.svg" alt="" />
          <span>Socialy</span>
        </div>
        <p className={`${styles.branding} fw-medium fs-medium`}>
          Share your thoughts with people and create connections
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const err = loginValidator({ email, password });
            setErrors(err);
            if (!err.email && !err.password) {
              // Send Login Request
            }
          }}
        >
          <div>
            <label htmlFor="email-field" className="filled-input">
              <span className="material-icons-outlined">email</span>
              <input
                type="text"
                id="email-field"
                placeholder="Email or Username"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </label>
            <span className="fs-small fw-medium error">{errors.email}</span>
          </div>
          <div>
            <label htmlFor="password-field" className="filled-input">
              <span className="material-icons-outlined">key</span>
              <input
                type={showPassword ? "text" : "password"}
                id="password-field"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {showPassword ? (
                <span
                  className="material-icons-outlined"
                  onClick={() => setShowPassword(false)}
                >
                  visibility_off
                </span>
              ) : (
                <span
                  className="material-icons-outlined"
                  onClick={() => setShowPassword(true)}
                >
                  visibility
                </span>
              )}
            </label>
            <span className="fs-small fw-medium error">{errors.password}</span>
          </div>
          <button className="contained-btn">Login</button>
        </form>
        <div className={styles.line}></div>
        <p className="fw-medium fs-medium">
          Doesn't have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
