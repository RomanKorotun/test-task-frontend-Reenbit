import { FC } from "react";
import Modal from "react-modal";
import styled from "./modalDeleteChat.module.css";
import sprite from "../../../images/sprite.svg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { deleteChat } from "../../../redux/api";

Modal.setAppElement("#root");

interface IModalDeleteChatProps {
  id: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const ModalDeleteChat: FC<IModalDeleteChatProps> = ({
  id,
  isOpen,
  onToggle,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onToggle}
      contentLabel="Example Modal"
      className={styled.modalDeleteChat}
      style={{
        overlay: {
          zIndex: 1000,
        },
        content: {
          zIndex: 1000,
        },
      }}
    >
      <div className={styled.title}>
        Are you sure you want to delete this chat?
      </div>
      <div className={styled.btnCard}>
        <button
          className={styled.btn}
          onClick={() => {
            dispatch(deleteChat(id));
            onToggle();
          }}
        >
          Yes
        </button>
        <button className={styled.btn} onClick={onToggle}>
          No
        </button>
        <button className={styled.btnClose}>
          <svg width={20} height={20} className={styled.iconClose}>
            <use href={`${sprite}#close-icon`} />
          </svg>
        </button>
      </div>
    </Modal>
  );
};
