import { FC, ReactNode, useState } from "react";

import Textarea from "../textarea";

import styles from "./index.module.css";

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = (props) => {
  const [postBody, setPostBody] = useState("");

  return (
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <form className={styles.card}>
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
      <div className={`${styles.center} ${styles.card}`}>
        <form className={styles.createPost}>
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
        <div>{props.children}</div>
      </div>
      <div className={styles.right}>
        <div className={styles.card}>Notifications</div>
      </div>
    </div>
  );
};

export default Layout;
