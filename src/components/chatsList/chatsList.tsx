import { FC, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import styled from "./chatsList.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { updateIsActiveChat } from "../../redux/api";
import { ModalAddChat } from "../Modals/ModalAddChat";

export const ChatsList: FC = () => {
  const [open, setOpen] = useState(false);
  const { chats } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const toggleModal = () => {
    setOpen((pS) => !pS);
  };
  return (
    <>
      {chats.length > 0 && (
        <div className={styled.chatListCard}>
          <div className={styled.headerList}>
            <div className={styled.chatListTitle}>Chats</div>
            <button className={styled.btnAddChat} onClick={toggleModal}>
              Add new chat
            </button>
          </div>
          <ul>
            {chats
              .map((chat) => {
                const lastEl = chat.messages[chat.messages.length - 1];
                let day = null;
                let monthName = null;
                let year = null;
                if (lastEl?.date) {
                  const data = new Date(lastEl.date);
                  day = data.getDate();
                  monthName = data.toLocaleString("en-US", {
                    month: "short",
                  });
                  year = data.getFullYear();
                }
                return (
                  <li
                    key={chat._id}
                    className={`${
                      chat.isActive === true
                        ? styled.listItemActive
                        : styled.listItem
                    }`}
                    onClick={() => {
                      dispatch(updateIsActiveChat(chat._id));
                    }}
                  >
                    <img
                      src={chat.avatar}
                      alt="avatar"
                      className={styled.img}
                    />
                    <div className={styled.nameDateCard}>
                      <div>
                        <span className={styled.firstName}>
                          {chat.firstName}
                        </span>
                        <span className={styled.lastName}>{chat.lastName}</span>
                      </div>
                      {day && monthName && year && (
                        <div
                          className={styled.date}
                        >{`${monthName} ${day}, ${year}`}</div>
                      )}
                    </div>
                  </li>
                );
              })
              .reverse()}
          </ul>
          <ModalAddChat isOpen={open} onToggle={toggleModal} />
        </div>
      )}
    </>
  );
};
