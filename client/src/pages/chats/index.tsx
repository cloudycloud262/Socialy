import { FC, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGetUserQuery } from "../../store/userApi";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import {
  chatApi,
  useGetChatsQuery,
  useGetMessagesQuery,
} from "../../store/chatApi";
import socket from "../../socket";
import { useGetCurrentUserQuery } from "../../store/authApi";
import { useAppDispatch } from "../../store";

import Textarea from "../../components/textarea";
import Loading from "../../components/loading";

import styles from "./index.module.css";

const Chats: FC = () => {
  const searchParams = Object.fromEntries(useSearchParams()[0]);
  const [messageBody, setMessageBody] = useState("");
  const [showChatRoom, setShowChatRoom] = useState(false);
  const { id } = useParams();
  const [activeChatIndex, setActiveChatIndex] = useState(-1);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getUser = useGetUserQuery(searchParams.userId ?? skipToken);
  const currentUser = useGetCurrentUserQuery();
  const getChats = useGetChatsQuery();
  const getMessages = useGetMessagesQuery(id ?? skipToken);

  useEffect(() => {
    getChats.isSuccess &&
      setActiveChatIndex(getChats.data.findIndex((c) => c.uuid === id));
  }, [getChats.isSuccess, id]);

  const sendMessageHandler = () => {
    console.log(
      getChats.data?.[activeChatIndex]?.userId,
      "A",
      searchParams.userId,
      "B"
    );
    if (
      id &&
      currentUser.data &&
      (getChats.data?.[activeChatIndex]?.userId || searchParams.userId)
    ) {
      const messageObj = {
        body: messageBody,
        chatId: id,
        senderId: currentUser.data._id,
      };
      socket.emit("send-message", messageObj, {
        isNew: searchParams.userId,
        receiverId:
          getChats.data?.[activeChatIndex]?.userId || searchParams.userId,
      });
      if (searchParams.userId) {
        dispatch(
          chatApi.util.updateQueryData("getChats", undefined, (draft) => [
            {
              username: getUser.data ? getUser.data.username : "",
              uuid: messageObj.chatId,
              userId: messageObj.senderId,
            },
            ...draft,
          ])
        );
        setActiveChatIndex(0);
      }
      dispatch(
        chatApi.util.updateQueryData("getMessages", id, (draft) => {
          draft.push(messageObj);
          return draft;
        })
      );
      navigate(`/chats/${id}`);
      setMessageBody("");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={`list ${styles.list}`}>
        {getChats.isFetching || getChats.isLoading ? <Loading /> : null}
        <span className="list-header fs-medium fw-medium">Chats</span>
        <div className="list">
          {getChats.data?.map((chat, index) => (
            <div
              className={`user-card user-card-hover ${
                activeChatIndex === index ? "user-card-active" : ""
              }`}
              key={index}
              onClick={() => {
                setShowChatRoom(true);
                navigate(`/chats/${chat.uuid}`);
              }}
            >
              <img src="/placeholderDp.png" alt="" className="dp-icon" />
              <span className="fs-medium fw-medium">{chat.username}</span>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`${styles.room} ${showChatRoom ? styles.roomActive : ""}`}
      >
        {activeChatIndex >= 0 || searchParams.userId ? (
          <div className={`user-card ${styles.roomHeader}`}>
            <img src="/placeholderDp.png" alt="" className="dp-icon" />
            <span className="fs-medium fw-medium">
              {getChats.data?.[activeChatIndex]?.username ||
                getUser.data?.username}
            </span>
            <span
              className="material-icons-outlined"
              onClick={() => setShowChatRoom(false)}
            >
              close
            </span>
          </div>
        ) : null}
        {activeChatIndex >= 0 || searchParams.userId ? (
          <div className={styles.chats}>
            {getMessages.isFetching || getMessages.isLoading ? (
              <Loading />
            ) : null}
            {getMessages.data
              ?.slice(0)
              .reverse()
              .map((message, index) => (
                <div
                  className={`${
                    message.senderId === currentUser.data?._id
                      ? styles.sentBubble
                      : styles.receivedBubble
                  } ${styles.bubble} fw-medium fs-medium`}
                  key={index}
                >
                  {message.body}
                </div>
              ))}
          </div>
        ) : (
          <div className={styles.placeholder}>Click on a chat</div>
        )}
        {activeChatIndex >= 0 || searchParams.userId ? (
          <div className="chat-area">
            <Textarea
              value={messageBody}
              placeholder="Start Chatting..."
              onChange={(val) => setMessageBody(val)}
              className="filled-input"
            />
            <span
              className="material-icons-outlined"
              onClick={() => sendMessageHandler()}
            >
              send
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Chats;
