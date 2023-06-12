import { FC, useState } from "react";

import Profile from "./profile";
import EditProfile from "./editProfile";
import Posts from "../../components/posts";

import styles from "./index.module.css";

const Account: FC = () => {
  const [showPosts, setShowPosts] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [nav, setNav] = useState("Posts");

  return (
    <div className={styles.wrapper}>
      <div className={styles.profile}>
        <Profile
          setNav={setNav}
          setShowEditForm={setShowEditForm}
          showEditForm={showEditForm}
          setShowPosts={setShowPosts}
        />
        <EditProfile showEditForm={showEditForm} />
      </div>
      <div
        className={`${styles.posts} ${
          showPosts ? styles.postsActive : ""
        } list`}
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
        <div className="list">
          {nav === "Followers" ? (
            [...Array(30)].map((_d, index) => (
              <div className="user-card" key={index}>
                <img src="/placeholderDp.png" alt="" className="dp-icon" />
                <span className="fw-medium fs-medium">Username</span>
              </div>
            ))
          ) : nav === "Following" ? (
            [...Array(30)].map((_d, index) => (
              <div className="user-card" key={index}>
                <img src="/placeholderDp.png" alt="" className="dp-icon" />
                <span className="fw-medium fs-medium">Username</span>
              </div>
            ))
          ) : nav === "Posts" ? (
            <Posts />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Account;
