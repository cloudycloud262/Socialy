import { FC, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signupValidator } from "../../utils/validators";
import { useSignupMutation } from "../../store/authApi";

import Loading from "../../components/loading";

import styles from "./index.module.css";

const Signup: FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [signup, status] = useSignupMutation();

  useEffect(() => {
    if (status.isError && "data" in status.error) {
      setErrors({ ...errors, ...(status.error.data as {}) });
    }
  }, [status.isError]);

  return (
    <div className={styles.bg}>
      {status.isLoading ? <Loading /> : null}
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
            const err = signupValidator({ email, username, password });
            if (!err.email && !err.username && !err.password) {
              signup({ email, username, password });
            } else {
              setErrors(err);
            }
          }}
        >
          <div className="form-input-wrapper">
            <label htmlFor="email-field" className="filled-input">
              <span className="material-icons-outlined">email</span>
              <input
                type="text"
                id="email-field"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  errors.email && setErrors((prev) => ({ ...prev, email: "" }));
                }}
              />
            </label>
            <span className="fs-small fw-medium error">{errors.email}</span>
          </div>
          <div className="form-input-wrapper">
            <label htmlFor="username-field" className="filled-input">
              <span className="material-icons-outlined">alternate_email</span>
              <input
                type="text"
                id="username-field"
                placeholder="Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  errors.username &&
                    setErrors((prev) => ({ ...prev, username: "" }));
                }}
              />
            </label>
            <span className="fs-small fw-medium error">{errors.username}</span>
          </div>
          <div className="form-input-wrapper">
            <label htmlFor="password-field" className="filled-input">
              <span className="material-icons-outlined">key</span>
              <input
                type={showPassword ? "text" : "password"}
                id="password-field"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  errors.password &&
                    setErrors((prev) => ({ ...prev, password: "" }));
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
          <button className="contained-btn">Signup</button>
        </form>
        <div className={styles.line}></div>
        <p className="fw-medium fs-medium">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
