import { FC } from "react";

import Layout from "../layout";

import styles from "./index.module.css";
import postStyles from "../post/index.module.css";

const Comments: FC = () => {
  return (
    <Layout>
      <div className={`list ${styles.wrapper}`}>
        <div className="list-header fw-medium fs-medium">Comments</div>
        <div className="list">
          {[...Array(30)].map((_d, index) => (
            <div key={index}>
              <div className={postStyles.postWrapper}>
                <img src="/placeholderDp.png" alt="" className="dp-icon" />
                <div className={postStyles.postBody}>
                  <div
                    className={`${postStyles.postHeader} disabled-text fs-small fw-medium`}
                  >
                    <span>Username</span>
                    <span>•</span>
                    <span>5h</span>
                  </div>
                  <div className="fs-medium fw-medium">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Consectetur aliquid, sapiente ad quasi molestias deleniti
                    minus eligendi nihil eveniet error nobis. Dolorum delectus
                    ducimus doloremque reiciendis dolor iure, tempore quos.
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Comments;
