import { useRef, useState, FC } from "react";
import useCloseOnOutsideClick from "../../hooks/useCloseOnOutsideClick";
import { useNavigate } from "react-router-dom";

import Navbar from "./navbar";

import styles from "./index.module.css";

const Header: FC = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAccMenu, setShowAccMenu] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const searchFieldRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useCloseOnOutsideClick(accountMenuRef, () => setShowAccMenu(false));

  return (
    <div className={styles.wrapper}>
      <div className={`logo ${styles.logo}`}>
        <img src="/vite.svg" alt="" />
        <span>Socialy</span>
      </div>
      <div
        className={`${styles.searchWrapper} ${
          showSearchBar ? styles.activeSearch : ""
        }`}
      >
        <label htmlFor="search" className={`filled-input ${styles.search}`}>
          <span className="material-icons-outlined">search</span>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Account"
            ref={searchFieldRef}
            onBlur={() => {
              setShowSearchBar(false);
            }}
          />
          <span
            className="material-icons-outlined"
            onClick={() => setShowSearchBar(false)}
          >
            close
          </span>
        </label>
        {searchTerm ? (
          <div className={`${styles.searchMenu} list`}>
            {[...Array(40)].map((_d, index) => (
              <div
                className="user-card user-card-hover"
                key={index}
                onClick={() => {
                  navigate(`/account/${index}`);
                  setSearchTerm("");
                }}
              >
                <img src="/placeholderDp.png" alt="" className="dp-icon" />
                <span className="fw-medium fs-small">Username</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
      <span
        className={`material-icons-outlined ${styles.searchIcon}`}
        onClick={() => {
          searchFieldRef.current?.focus();
          setShowSearchBar(true);
        }}
      >
        search
      </span>
      <Navbar />
      <div className="menu-wrapper" ref={accountMenuRef}>
        <div
          className={styles.account}
          onClick={() => setShowAccMenu((prev) => !prev)}
        >
          <img src="/placeholderDp.png" alt="" className="dp-icon" />
          <span className="fs-medium fw-medium">Chrome</span>
          <span className="material-icons-outlined">arrow_drop_down</span>
        </div>
        <div className={`menu ${showAccMenu ? "menu-active " : ""}`}>
          <button
            className="menu-item transparent-btn icon-btn disabled-text"
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
};

export default Header;
