import { FC } from "react";
import { useState } from "react";

import { Link } from "react-router-dom";

import styles from "./index.module.css";

const Navbar: FC = () => {
  const [active, setActive] = useState("");

  return (
    <div className={styles.navbar}>
      <Link
        to="/"
        className={`${styles.navItem} ${
          active === "home" ? styles.activeNavItem : ""
        }`}
        onClick={() => setActive("home")}
      >
        {active === "home" ? (
          <span className="material-icons">home</span>
        ) : (
          <span className="material-icons-outlined">home</span>
        )}
      </Link>
      <Link
        to="/explore"
        className={`${styles.navItem} ${
          active === "explore" ? styles.activeNavItem : ""
        }`}
        onClick={() => setActive("explore")}
      >
        {active === "explore" ? (
          <span className="material-icons">explore</span>
        ) : (
          <span className="material-icons-outlined">explore</span>
        )}
      </Link>
      <Link
        to="/requests"
        className={`${styles.navItem} ${
          active === "requests" ? styles.activeNavItem : ""
        }`}
        onClick={() => setActive("requests")}
      >
        {active === "requests" ? (
          <span className="material-icons">person_add</span>
        ) : (
          <span className="material-icons-outlined">person_add</span>
        )}
      </Link>
      <Link
        to="/notifications"
        className={`${styles.navItem} ${
          active === "notifications" ? styles.activeNavItem : ""
        }`}
        onClick={() => setActive("notifications")}
      >
        {active === "notifications" ? (
          <span className="material-icons">notifications</span>
        ) : (
          <span className="material-icons-outlined">notifications</span>
        )}
      </Link>
      <Link
        to="/chats"
        className={`${styles.navItem} ${
          active === "chats" ? styles.activeNavItem : ""
        }`}
        onClick={() => setActive("chats")}
      >
        {active === "chats" ? (
          <span className="material-icons">chat</span>
        ) : (
          <span className="material-icons-outlined">chat</span>
        )}
      </Link>
    </div>
  );
};

export default Navbar;
