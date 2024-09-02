import { FC } from "react";
import Modal from "react-modal";
import styled from "./modalEditChat.module.css";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import sprite from "../../../images/sprite.svg";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { editChat } from "../../../redux/api";

const blankStringRegexp = /^(?!\s*$).+/;

const AddChatSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(blankStringRegexp, "A space-only string!")
    .min(2, "Too Short!")
    .max(50, "Too Long!"),
  lastName: Yup.string()
    .matches(blankStringRegexp, "A space-only string!")
    .min(2, "Too Short!")
    .max(50, "Too Long!"),
});

export interface IModalEditChat {
  firstName?: string;
  lastName?: string;
  id?: string;
}

Modal.setAppElement("#root");

interface IModalEditChatProps {
  isOpen: boolean;
  onToggle: () => void;
  id: string;
  chat: { firstName: string; lastName: string };
}

export const ModalEditChat: FC<IModalEditChatProps> = ({
  id,
  isOpen,
  onToggle,
  chat,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onToggle}
      contentLabel="Example Modal"
      className={styled.modalEditChat}
    >
      <Formik
        initialValues={{
          firstName: chat.firstName || "",
          lastName: chat.lastName || "",
        }}
        validationSchema={AddChatSchema}
        onSubmit={(
          values: IModalEditChat,
          actions: FormikHelpers<IModalEditChat>
        ) => {
          if (values.firstName !== "" && values.lastName === "") {
            dispatch(
              editChat({
                id,
                firstName: values.firstName,
              })
            );
          }
          if (values.firstName === "" && values.lastName !== "") {
            dispatch(
              editChat({
                id,
                lastName: values.lastName,
              })
            );
          }
          if (values.firstName !== "" && values.lastName !== "") {
            dispatch(
              editChat({
                id,
                firstName: values.firstName,
                lastName: values.lastName,
              })
            );
          }
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
            Edit chat
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
