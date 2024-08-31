import { FC } from "react";
import styled from "./rightChatPage.module.css";
import sprite from "../../images/sprite.svg";
import { useAuth } from "../../hooks/useAuth";
import { Formik, Field, Form, FormikHelpers } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addMessage } from "../../redux/api";

export interface IValues {
  message: string;
  id?: string;
}

export const RightChatPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { chats } = useAuth();
  const chat = chats.find((el) => el.isActive === true);
  return (
    <>
      {chat && (
        <div className={styled.right}>
          <div className={styled.nameChat}>
            <img src={chat.avatar} alt="avatar" className={styled.img} />
            <div>
              <span className={styled.firstName}>{chat.firstName}</span>
              <span>{chat.lastName}</span>
            </div>
          </div>
          <ul className={styled.listMessage}>
            {chat.messages.map((el) => {
              const data = new Date(el.date);
              const dayOfMonth = data.getDate();
              const monthIndex = data.getMonth() + 1;
              const year = data.getFullYear();
              const hours = data.getHours();
              const minutes = data.getMinutes();
              const seconds = data.getSeconds();
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
                        >{`${monthIndex}/${dayOfMonth}/${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds} AM`}</p>
                      </div>
                    </>
                  )}
                  {!el?.owner && (
                    <>
                      <div className={styled.messageDateWrapper}>
                        <p className={styled.messageRight}>{el.message}</p>
                        <p
                          className={styled.dateRight}
                        >{`${monthIndex}/${dayOfMonth}/${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds} AM`}</p>
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
        </div>
      )}
    </>
  );
};
