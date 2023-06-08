import { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import styles from "./index.module.css";

const Navbar: FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className={styles.navbar}>
      <Link
        to="/"
        className={`${styles.navItem} ${
          pathname === "/" ? styles.activeNavItem : ""
        }`}
        onClick={() => navigate("/")}
      >
        {pathname === "/" ? (
          <span className="material-icons">home</span>
        ) : (
          <span className="material-icons-outlined">home</span>
        )}
      </Link>
      <Link
        to="/explore"
        className={`${styles.navItem} ${
          pathname === "/explore" ? styles.activeNavItem : ""
        }`}
        onClick={() => navigate("/explore")}
      >
        {pathname === "/explore" ? (
          <span className="material-icons">explore</span>
        ) : (
          <span className="material-icons-outlined">explore</span>
        )}
      </Link>
      <Link
        to="/requests"
        className={`${styles.navItem} ${
          pathname === "/requests" ? styles.activeNavItem : ""
        }`}
        onClick={() => navigate("/requests")}
      >
        {pathname === "/requests" ? (
          <span className="material-icons">person_add</span>
        ) : (
          <span className="material-icons-outlined">person_add</span>
        )}
      </Link>
      <Link
        to="/notifications"
        className={`${styles.navItem} ${
          pathname === "/notifications" ? styles.activeNavItem : ""
        }`}
        onClick={() => navigate("/notifications")}
      >
        {pathname === "/notifications" ? (
          <span className="material-icons">notifications</span>
        ) : (
          <span className="material-icons-outlined">notifications</span>
        )}
      </Link>
      <Link
        to="/chats"
        className={`${styles.navItem} ${
          pathname === "/chats" ? styles.activeNavItem : ""
        }`}
        onClick={() => navigate("/chats")}
      >
        {pathname === "/chats" ? (
          <span className="material-icons">chat</span>
        ) : (
          <span className="material-icons-outlined">chat</span>
        )}
      </Link>
    </div>
  );
};

export default Navbar;
