import { useEffect } from "react";
import socket from "../socket";
import { chatApi } from "../store/chatApi";
import { useAppDispatch } from "../store";

const useChatsSocketHooks = (): void => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    socket.on("add-message", async (messageObj, extraObj) => {
      if (extraObj.isNew) {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/user/${messageObj.senderId}`,
          { credentials: "include" }
        );
        const username = (await res.json()).username;
        dispatch(
          chatApi.util.updateQueryData("getChats", undefined, (draft) => [
            { username, uuid: messageObj.chatId, userId: messageObj.senderId },
            ...draft,
          ])
        );
        dispatch(
          chatApi.util.upsertQueryData("getMessages", messageObj.chatId, [
            messageObj,
          ])
        );
      } else {
        dispatch(
          chatApi.util.updateQueryData(
            "getMessages",
            messageObj.chatId,
            (draft) => {
              draft.push(messageObj);
              return draft;
            }
          )
        );
      }
    });
    return () => {
      socket.removeAllListeners("add-message");
    };
  }, []);
};

export default useChatsSocketHooks;
