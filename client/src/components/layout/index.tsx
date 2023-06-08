import { FC, ReactNode, useState } from "react";

import Textarea from "../textarea";

import styles from "./index.module.css";
import { Link } from "react-router-dom";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = (props) => {
  const [postBody, setPostBody] = useState("");

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <form className={styles.postForm}>
          <label id="create-post" className="filled-input">
            <Textarea
              value={postBody}
              onChange={(val) => {
                setPostBody(val);
              }}
              placeholder="What's on your mind?"
              maxLength={200}
            />
          </label>
          <button className="contained-btn icon-btn">
            <span className="material-icons-outlined">edit</span>
            <span className="fs-small fw-medium">Create</span>
          </button>
        </form>
      </div>
      <div className={`${styles.center}`}>
        <form className={styles.postForm}>
          <label id="create-post" className="filled-input">
            <Textarea
              value={postBody}
              onChange={(val) => setPostBody(val)}
              placeholder="What's on your mind?"
              maxLength={200}
            />
          </label>
          <button className="contained-btn icon-btn">
            <span className="material-icons-outlined">edit</span>
            <span className="fs-small fw-medium">Create</span>
          </button>
        </form>
        {props.children}
      </div>
      <div className={styles.right}>
        <div className="list">
          <span className="list-header fw-medium fs-medium">Notifications</span>
          <div className="list">
            {[...Array(5)].map((_d, index) => (
              <div className="user-card" key={index}>
                <img src="/placeholderDp.png" alt="" className="dp-icon" />
                <span className="fs-small fw-medium">
                  Username started following you with 100 others people. Are we
                  goin to ignore all of tha{" "}
                  <span className="disabled-text">•</span>
                  <span className="fs-small fw-medium disabled-text">7h</span>
                </span>
              </div>
            ))}
            <Link className={styles.nfLink} to="/notifications">
              <span className="fs-small fw-medium">Show All Notifications</span>
              <span className="material-icons-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
