import { FC } from "react";
import { NfsArgs, useGetNotificationsQuery } from "../../store/notificationApi";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.css";

type NfProps = {
  unreadCount?: number;
  isSideCard?: boolean;
  query: NfsArgs;
};

const Notifications: FC<NfProps> = (props) => {
  const navigate = useNavigate();

  const getNotification = useGetNotificationsQuery(props.query);

  return (
    <div className="list">
      <span className="list-header fs-medium fw-medium">Notifications</span>
      <div className="list">
        {getNotification.data?.map((nf, index) => (
          <div className="user-card" key={index}>
            <img src="/placeholderDp.png" alt="" className="dp-icon" />
            <span className="fs-small fw-medium">
              <span onClick={() => navigate(`/post/${nf.contentId}`)}>
                {nf.type === "like" ? `${nf.username} liked your post` : null}
              </span>
              {nf.type === "follow"
                ? `${nf.username} started following you`
                : null}
              {nf.type === "requested"
                ? `${nf.username} requested to follow you`
                : null}
              {nf.type === "accepted"
                ? `${nf.username} accepted your follow request`
                : null}
              <span onClick={() => navigate(`/post/${nf.contentId}`)}>
                {nf.type === "comment"
                  ? `${nf.username} commented on your post: ${nf.comment}`
                  : null}
              </span>
              <span className="disabled-text"> • </span>
              <span className="fs-small fw-medium disabled-text">7h</span>
            </span>
            {!props.isSideCard &&
            props.unreadCount &&
            index < props.unreadCount ? (
              <span className={`material-icons ${styles.unreadDot}`}>
                fiber_manual_record
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
