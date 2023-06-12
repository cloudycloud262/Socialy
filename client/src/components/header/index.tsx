import { useRef, useState, FC, useEffect } from "react";
import useCloseOnOutsideClick from "../../hooks/useCloseOnOutsideClick";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUserQuery, useLogoutMutation } from "../../store/authApi";
import { useGetUsersQuery } from "../../store/userApi";

import Navbar from "./navbar";
import Loading from "../loading";

import styles from "./index.module.css";

const Header: FC = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState({ term: "", debounced: "" });
  const [showAccMenu, setShowAccMenu] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const searchFieldRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const currentUser = useGetCurrentUserQuery();
  const getUsers = useGetUsersQuery(
    {
      type: "search",
      username: searchTerm.debounced,
    },
    { skip: !searchTerm.debounced }
  );
  const [logout, logoutStatus] = useLogoutMutation();

  useEffect(() => {
    const to = setTimeout(() => {
      setSearchTerm((prev) => ({ ...prev, debounced: prev.term }));
    }, 500);
    return () => {
      clearTimeout(to);
    };
  }, [searchTerm.term]);
  useCloseOnOutsideClick(accountMenuRef, () => setShowAccMenu(false));

  return (
    <>
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
              value={searchTerm.term}
              onChange={(e) =>
                setSearchTerm((prev) => ({ ...prev, term: e.target.value }))
              }
              placeholder="Search Account"
              ref={searchFieldRef}
              onFocus={() => {
                setShowSearchBar(true);
              }}
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
          {searchTerm && showSearchBar ? (
            <div className={`${styles.searchMenu} list`}>
              {getUsers.isLoading || getUsers.isFetching ? (
                <div className={styles.searchLoading}>
                  <Loading />
                </div>
              ) : null}
              {getUsers.currentData?.length === 0 ? (
                <div className={`fs-medium fw-medium ${styles.searchEmpty}`}>
                  No Results Found
                </div>
              ) : null}
              {getUsers.currentData?.map((user, index) => (
                <div
                  className="user-card user-card-hover"
                  key={index}
                  onClick={() => {
                    navigate(`/account/${user._id}`);
                    setSearchTerm((prev) => ({ ...prev, term: "" }));
                  }}
                >
                  <img src="/placeholderDp.png" alt="" className="dp-icon" />
                  <span className="fw-medium fs-small">{user.username}</span>
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
            <span className="fs-medium fw-medium">
              {currentUser.data?.username}
            </span>
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
            <button
              className="menu-item danger-btn transparent-btn icon-btn"
              onClick={() => {
                logout();
                setShowAccMenu(false);
              }}
            >
              <span className="material-icons-outlined">logout</span>
              <span className="fw-medium fs-small">Logout</span>
            </button>
          </div>
        </div>
      </div>
      {logoutStatus.isLoading ? <Loading /> : null}
    </>
  );
};

export default Header;
