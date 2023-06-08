import { FC, useState } from "react";

import Layout from "../../components/layout";

const Requests: FC = () => {
  const [tab, setTab] = useState("received");

  return (
    <Layout>
      <div className="list">
        <span className="list-header fs-medium fw-medium">Requests</span>
        <div className="tab">
          <div
            className={`tab-item fs-medium fw-medium ${
              tab === "received" ? "active-tab" : ""
            }`}
            onClick={() => setTab("received")}
          >
            Received
          </div>
          <div
            className={`tab-item fs-medium fw-medium ${
              tab === "sent" ? "active-tab" : ""
            }`}
            onClick={() => setTab("sent")}
          >
            Sent
          </div>
        </div>
        <div className="list">
          {[...Array(40)].map((_d, index) => (
            <div className="user-card" key={index}>
              <img src="/placeholderDp.png" alt="" className="dp-icon" />
              <span className="fs-medium fw-medium">Username</span>
              <div className="btn-grp">
                {tab === "sent" ? (
                  <button className="danger-btn outlined-btn">Remove</button>
                ) : (
                  <>
                    <button className="contained-btn">Accept</button>
                    <button className="danger-btn outlined-btn">Decline</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Requests;
