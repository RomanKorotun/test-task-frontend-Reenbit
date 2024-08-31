import { FC } from "react";
import Modal from "react-modal";
import styled from "./modalAddChat.module.css";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import sprite from "../../images/sprite.svg";

import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addChat } from "../../redux/api";

const AddChatSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export interface IChat {
  firstName: string;
  lastName: string;
}

Modal.setAppElement("#root");

interface IModalAddChatProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const ModalAddChat: FC<IModalAddChatProps> = ({ isOpen, onToggle }) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onToggle}
      contentLabel="Example Modal"
      className={styled.modalAddChat}
    >
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
        }}
        validationSchema={AddChatSchema}
        onSubmit={(values: IChat, actions: FormikHelpers<IChat>) => {
          dispatch(addChat(values));
          onToggle();
        }}
      >
        <Form>
          <label className={styled.label}>
            <Field
              name="firstName"
              placeholder="firstName"
              className={styled.inputCustom}
            />
            <ErrorMessage
              component="div"
              name="firstName"
              className={styled.errMsg}
            />
          </label>
          <label className={styled.label}>
            <Field
              name="lastName"
              placeholder="lastName"
              className={styled.inputCustom}
            />
            <ErrorMessage
              component="div"
              name="lastName"
              className={styled.errMsg}
            />
          </label>

          <button type="submit" className={styled.btnSubmit}>
            Add chat
          </button>
          <button className={styled.btnClose} onClick={onToggle}>
            <svg className={styled.iconClose} width={20} height={20}>
              <use href={`${sprite}#close-icon`} />
            </svg>
          </button>
        </Form>
      </Formik>
    </Modal>
  );
};
