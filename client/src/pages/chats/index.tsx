import { FC, useState } from "react";

import Textarea from "../../components/textarea";

import styles from "./index.module.css";

const Chats: FC = () => {
  const [messageBody, setMessageBody] = useState("");
  const [showChatRoom, setShowChatRoom] = useState(false);
  const [activeChat, setActiveChat] = useState(-1);

  return (
    <div className={styles.wrapper}>
      <div className={`list ${styles.list}`}>
        <span className="list-header fs-medium fw-medium">Chats</span>
        <div className="list">
          {[...Array(30)].map((_d, index) => (
            <div
              className={`user-card user-card-hover ${
                activeChat === index ? "user-card-active" : ""
              }`}
              key={index}
              onClick={() => {
                setActiveChat(index);
                setShowChatRoom(true);
              }}
            >
              <img src="/placeholderDp.png" alt="" className="dp-icon" />
              <span className="fs-medium fw-medium">Username</span>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`${styles.room} ${showChatRoom ? styles.roomActive : ""}`}
      >
        <div className={`user-card ${styles.roomHeader}`}>
          <img src="/placeholderDp.png" alt="" className="dp-icon" />
          <span className="fs-medium fw-medium">
            Usernamefsdfdsfsfdsfuisdhsdifhsdifhsdiufhdsiufhsi
          </span>
          <span
            className="material-icons-outlined"
            onClick={() => setShowChatRoom(false)}
          >
            close
          </span>
        </div>
        <div className={styles.chats}>
          {[...Array(20)].map((_d, index) => (
            <div
              className={`${styles.receivedBubble} ${styles.bubble} fw-medium fs-medium`}
              key={index}
            >
              Hello
            </div>
          ))}
          <div
            className={`${styles.nfBubble} ${styles.bubble} fw-medium fs-medium`}
          >
            Unread Messages
          </div>
          {[...Array(20)].map((_d, index) => (
            <div
              className={`${styles.sentBubble} ${styles.bubble} fw-medium fs-medium`}
              key={index}
            >
              Sent
            </div>
          ))}
        </div>
        <div className="chat-area">
          <Textarea
            value={messageBody}
            placeholder="Start Chatting..."
            onChange={(val) => setMessageBody(val)}
            className="filled-input"
          />
          <span className="material-icons-outlined">send</span>
        </div>
      </div>
    </div>
  );
};

export default Chats;
