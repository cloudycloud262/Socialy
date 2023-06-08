import { FC, useState } from "react";

import styles from "./index.module.css";

const Account: FC = () => {
  const [showPosts, setShowPosts] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [nav, setNav] = useState("Posts");

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <div className={styles.dpContainer}>
          <img src="/placeholderCover.jpg" alt="" className={styles.cover} />
          <img src="/placeholderDp.png" alt="" className={styles.dp} />
          <div className={`btn-grp ${styles.profileActionBtn}`}>
            {showEditForm ? (
              <button
                className="outlined-btn icon-btn danger-btn"
                onClick={() => setShowEditForm(false)}
              >
                <span className="material-icons-outlined">close</span>
                <span className="fs-small fw-medium">Cancel</span>
              </button>
            ) : (
              <button
                className="contained-btn icon-btn"
                onClick={() => setShowEditForm(true)}
              >
                <span className="material-icons-outlined">edit</span>
                <span className="fs-small fw-medium">Edit Profile</span>
              </button>
            )}
          </div>
        </div>
        <div className="fw-medium fs-medium">Username</div>
        <div className={styles.connections}>
          <button
            onClick={() => {
              setShowPosts(true);
              setNav("Followers");
            }}
          >
            <span className="fs-medium fw-medium">200</span>
            <span className="fs-small fw-thin">Followers</span>
          </button>
          <button
            onClick={() => {
              setShowPosts(true);
              setNav("Following");
            }}
          >
            <span className="fs-medium fw-medium">150</span>
            <span className="fs-small fw-thin">Following</span>
          </button>
          <button
            onClick={() => {
              setShowPosts(true);
              setNav("Posts");
            }}
          >
            <span className="fs-medium fw-medium">150</span>
            <span className="fs-small fw-thin">Posts</span>
          </button>
        </div>
        <form
          className={`${styles.editProfile} ${
            showEditForm ? styles.editProfileActive : ""
          }`}
        >
          <input type="text" className="filled-input" placeholder="Email" />
          <input type="text" className="filled-input" placeholder="Username" />
          <span className="fs-small fw-medium">
            To update profile, enter the current password
          </span>
          <input
            type="text"
            className="filled-input"
            placeholder="Current Password"
          />
          <button className="contained-btn icon-btn" placeholder="username">
            <span className="material-icons-outlined">edit</span>
            <span className="fs-small fw-medium">Update</span>
          </button>
        </form>
      </div>
      <div
        className={`${styles.posts} ${
          showPosts ? styles.postsActive : ""
        } list-wrapper`}
      >
        <div className="list-header">
          <span className="fs-medium fw-medium">{nav}</span>
          <span
            className="material-icons-outlined"
            onClick={() => setShowPosts(false)}
          >
            close
          </span>
        </div>
        <div className="list"></div>
      </div>
    </div>
  );
};

export default Account;
