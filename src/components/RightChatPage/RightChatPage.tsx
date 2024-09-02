import { FC, useState } from "react";
import styled from "./rightChatPage.module.css";
import sprite from "../../images/sprite.svg";
import { useAuth } from "../../hooks/useAuth";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addMessage } from "../../redux/api";
import { ModalDeleteChat } from "../Modals/ModalDeleteChat/ModalDeleteChat";
import { ModalEditChat } from "../Modals/ModalEditChat/ModalEditChat";

export interface IValues {
  message: string;
  id?: string;
}

export const RightChatPage: FC = () => {
  const [openEditChat, setOpenEditChat] = useState<boolean>(false);
  const [openDeleteChat, setOpenDeleteChat] = useState<boolean>(false);
  const toggleEditChat = () => {
    setOpenEditChat((pS: boolean) => !pS);
  };
  const toggleDeleteChat = () => {
    setOpenDeleteChat((pS: boolean) => !pS);
  };
  const dispatch = useDispatch<AppDispatch>();
  const { chats } = useAuth();
  const chat = chats.find((el) => el.isActive === true);
  return (
    <>
      {chat && (
        <div className={styled.right}>
          <div className={styled.headerChat}>
            <div className={styled.nameChat}>
              <img src={chat.avatar} alt="avatar" className={styled.img} />
              <div>
                <span className={styled.firstName}>{chat.firstName}</span>
                <span>{chat.lastName}</span>
              </div>
            </div>
            <div className={styled.updateChat}>
              <button className={styled.btnHeaderChat} onClick={toggleEditChat}>
                <svg width={20} height={20} className={styled.editIcon}>
                  <use href={`${sprite}#edit-icon`} />
                </svg>
              </button>
              <button
                className={styled.btnHeaderChat}
                onClick={toggleDeleteChat}
              >
                <svg width={20} height={20} className={styled.deleteIcon}>
                  <use href={`${sprite}#delete-icon`} />
                </svg>
              </button>
            </div>
          </div>
          <ul className={styled.listMessage}>
            {chat.messages.map((el) => {
              let data;
              if (el?.date) {
                data = new Date(el.date);
              }
              let dayOfMonth = null;
              let monthIndex = null;
              let year = null;
              let hours = null;
              let minutes = null;
              let seconds = null;
              if (data) {
                dayOfMonth = data.getDate();
                monthIndex = data.getMonth() + 1;
                year = data.getFullYear();
                hours = data.getHours();
                minutes = data.getMinutes();
                seconds = data.getSeconds();
              }
              const formattedDayOfMonth = String(dayOfMonth).padStart(2, "0");
              const formattedMonthIndex = String(monthIndex).padStart(2, "0");
              const formattedHours = String(hours).padStart(2, "0");
              const formattedMinutes = String(minutes).padStart(2, "0");
              const formattedSeconds = String(seconds).padStart(2, "0");
              return (
                <li
                  key={el._id}
                  className={
                    el?.owner ? styled.messageCardLeft : styled.messageCardRight
                  }
                >
                  {el?.owner && (
                    <>
                      <div className={styled.messageDateWrapper}>
                        <p className={styled.messageLeft}>{el.message}</p>
                        <p
                          className={styled.dateLeft}
                        >{`${formattedDayOfMonth}/${formattedMonthIndex}/${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds} AM`}</p>
                      </div>
                    </>
                  )}
                  {!el?.owner && (
                    <>
                      <div className={styled.messageDateWrapper}>
                        <p className={styled.messageRight}>{el.message}</p>
                        <p
                          className={styled.dateRight}
                        >{`${formattedDayOfMonth}/${formattedMonthIndex}/${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds} AM`}</p>
                      </div>
                    </>
                  )}
                </li>
              );
            })}
          </ul>
          <Formik
            initialValues={{
              message: "",
            }}
            onSubmit={(values: IValues, actions: FormikHelpers<IValues>) => {
              dispatch(addMessage({ message: values.message, id: chat._id }));
              actions.resetForm();
            }}
          >
            <div className={styled.formWrapper}>
              <Form className={styled.form}>
                <Field
                  name="message"
                  placeholder="Type your message"
                  className={styled.input}
                />
                <button className={styled.btn}>
                  <svg width={25} height={25} className={styled.icon}>
                    <use href={`${sprite}#arrow-icon`} />
                  </svg>
                </button>
              </Form>
            </div>
          </Formik>
          <ModalEditChat
            isOpen={openEditChat}
            onToggle={toggleEditChat}
            id={chat._id}
            chat={{ firstName: chat.firstName, lastName: chat.lastName }}
          />
          <ModalDeleteChat
            isOpen={openDeleteChat}
            onToggle={toggleDeleteChat}
            id={chat._id}
          />
        </div>
      )}
    </>
  );
};
