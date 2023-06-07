import { useRef, useState } from "react";
import useCloseOnOutsideClick from "../../hooks/useCloseOnOutsideClick";
import { useNavigate } from "react-router-dom";

import Navbar from "./navbar";

import styles from "./index.module.css";

export default function Header() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showAccMenu, setShowAccMenu] = useState(false);
  const accountMenuRef = useRef(null);
  const navigate = useNavigate();

  useCloseOnOutsideClick(accountMenuRef, () => setShowAccMenu(false));

  return (
    <div className={styles.wrapper}>
      <div className={`logo ${styles.logo}`}>
        <img src="/vite.svg" alt="" />
        <span>Socialy</span>
      </div>
      <label
        htmlFor="search"
        className={`filled-input ${styles.search} ${
          showSearchBar ? styles.activeSearch : ""
        }`}
      >
        <span className="material-icons-outlined">search</span>
        <input type="text" id="search" placeholder="Search Account" />
        <span
          className="material-icons-outlined"
          onClick={() => setShowSearchBar(false)}
        >
          close
        </span>
      </label>
      <span
        className={`material-icons-outlined ${styles.searchIcon}`}
        onClick={() => setShowSearchBar(true)}
      >
        search
      </span>
      <Navbar />
      <div className="menu-wrapper" ref={accountMenuRef}>
        <div
          className={styles.account}
          onClick={() => setShowAccMenu((prev) => !prev)}
        >
          <img src="/placeholderDp.png" alt="" className="account-icon" />
          <span className="fs-medium fw-medium">Chrome</span>
          <span className="material-icons-outlined">arrow_drop_down</span>
        </div>
        <div className={`menu ${showAccMenu ? "menu-active " : ""}`}>
          <button
            className="menu-item transparent-btn icon-btn"
            onClick={() => {
              navigate("/account");
              setShowAccMenu(false);
            }}
          >
            <span className="material-icons-outlined">account_circle</span>
            <span className="fw-medium fs-small">Account</span>
          </button>
          <button className="menu-item danger-btn transparent-btn icon-btn">
            <span className="material-icons-outlined">logout</span>
            <span className="fw-medium fs-small">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
