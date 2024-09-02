import { FC, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import styled from "./chatsList.module.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { updateIsActiveChat } from "../../redux/api";
import { ModalAddChat } from "../Modals/ModalAddChat/ModalAddChat";

export const ChatsList: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const { chats } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const toggleModal = () => {
    setOpen((pS) => !pS);
  };

  const filterChats = chats.filter(
    (chat) =>
      chat.firstName.toLowerCase().includes(inputValue.toLowerCase()) ||
      chat.lastName.toLowerCase().includes(inputValue.toLowerCase())
  );
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
          <div className={styled.filterCard}>
            <input
              className={styled.inputFilter}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Search or start new chat"
            />
          </div>

          <ul>
            {filterChats
              .map((chat) => {
                //===== message =======
                const lastMessage =
                  chat.messages[chat.messages.length - 1]?.message;
                const isValid =
                  lastMessage && lastMessage.split("").length > 50;
                //===== message /======
                //===== date ======
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
                //===== date /======
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
                        <div className={styled.namesCard}>
                          <span className={styled.firstName}>
                            {chat.firstName}
                          </span>
                          <span className={styled.lastName}>
                            {chat.lastName}
                          </span>
                        </div>
                        {chat.messages.length > 0 && isValid && (
                          <p className={styled.message}>
                            {chat.messages[
                              chat.messages.length - 1
                            ]?.message?.slice(0, 49)}
                            &nbsp;...
                          </p>
                        )}
                        {chat.messages.length > 0 && !isValid && (
                          <p className={styled.message}>
                            {chat.messages[chat.messages.length - 1].message}
                          </p>
                        )}
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
