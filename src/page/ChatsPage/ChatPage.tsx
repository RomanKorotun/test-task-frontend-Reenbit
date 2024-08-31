import { FC, useEffect } from "react";
import io from "socket.io-client";
import { Header } from "../../components/Header/Header";
import { ChatsList } from "../../components/chatsList/chatsList";
import { useAuth } from "../../hooks/useAuth";
import styled from "./chatPage.module.css";
import { RightChatPage } from "../../components/RightChatPage/RightChatPage";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addRandomQuote } from "../../redux/auth/authSlice";

const socket = io("https://test-task-backend-reenbit.onrender.com");

const ChatsPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { chats } = useAuth();
  console.log(chats);
  useEffect(() => {
    socket.on("quoteResponse", (updatedChat) => {
      dispatch(addRandomQuote(updatedChat));
    });

    return () => {
      socket.off("quoteResponse");
    };
  }, [dispatch]);

  return (
    <div>
      <div className={styled.containerChatPage}>
        <div className={styled.left}>
          <Header />
          {chats?.length > 0 && <ChatsList />}
        </div>
        {chats.length > 0 && <RightChatPage />}
      </div>
    </div>
  );
};
export default ChatsPage;
