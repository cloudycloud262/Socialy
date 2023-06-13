import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

import PostForm from "../post/postForm";

import styles from "./index.module.css";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <PostForm type="create" />
      </div>
      <div className={`${styles.center}`}>
        <PostForm type="create" />
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
