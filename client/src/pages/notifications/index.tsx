import { FC } from "react";

import Layout from "../../components/layout";

const Notifications: FC = () => {
  return (
    <Layout>
      <div className="list-wrapper">
        <span className="list-header fs-medium fw-medium">Notifications</span>
        <div className="list">
          {[...Array(70)].map((_d, index) => (
            <div className="user-item" key={index}>
              <img src="/placeholderDp.png" alt="" className="dp-icon" />
              <span className="fs-small fw-medium">
                Username started following you with 100 others people. Are we
                goin to ignore all of tha{" "}
                <span className="disabled-text">•</span>
                <span className="fs-small fw-medium disabled-text">7h</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
