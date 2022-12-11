import { reaction } from "mobx";
import React, { useEffect, useState } from "react";
import tasksStore from "../../store/tasksStore";
import ModalProps from "../../types/Modal";
import styles from "./styles.module.scss";

const Modal = (props: ModalProps) => {
  const [show, setShow] = useState(false);
  const [taskText, setTaskText] = useState("");
  useEffect(() => {
    setShow(props.show);
  }, []);

  useEffect(() => {
    setShow(props.show);
  }, [props.show]);

  const onSetShowFalse = () => {
    setShow(false);
    props.onSetShow(false);
    setTaskText("");
  };

  useEffect(() => {
    tasksStore.setTaskText(taskText);
  }, [taskText]);

  const handleChangeTaskText = (e) => {
    setTaskText(e.target.value);
  };

  const onCreateTask = () => {
    props.onCreate();
    setTaskText("");
  };

  return (
    <div
      className={
        show ? styles["background__modal--active"] : styles["background__modal"]
      }
      onClick={() => {
        document.body.classList.remove("modal-open");
        onSetShowFalse();
      }}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modal__body}>
          <div className={styles.heading}>✍🏻 Enter text...</div>
          <textarea
            className={styles.inputField}
            rows={5}
            cols={50}
            id="TITLE"
            value={taskText}
            onChange={handleChangeTaskText}
          ></textarea>
        </div>
        <button className={styles.createButton} onClick={onCreateTask}>
          Create
        </button>
      </div>
    </div>
  );
};

export default Modal;
