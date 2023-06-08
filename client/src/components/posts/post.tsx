import { FC } from "react";

import styles from "./index.module.css";

const Post: FC = () => {
  return (
    <div className={styles.postWrapper}>
      <img src="/placeholderDp.png" alt="" className="dp-icon" />
      <div className={styles.postBody}>
        <div
          className={`${styles.postHeader} disabled-text fs-small fw-medium`}
        >
          <span>Username</span>
          <span>•</span>
          <span>5h</span>
        </div>
        <div className="fs-medium fw-medium">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          aliquid, sapiente ad quasi molestias deleniti minus eligendi nihil
          eveniet error nobis. Dolorum delectus ducimus doloremque reiciendis
          dolor iure, tempore quos.
        </div>
        <div
          className={`${styles.engagement} disabled-text fs-small fw-medium`}
        >
          <div>
            <span className="material-icons-outlined">star_border</span>
            <span>80</span>
          </div>
          <div>
            <span className="material-icons-outlined">rate_review</span>
            <span>150</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
