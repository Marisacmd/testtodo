import React, { ChangeEvent, useEffect, useState } from "react";
import { globals } from "../../config/globals";
import ModalCreateTask from "../../components/ModalCreateTask/ModalCreateTask";
import tasksStore from "../../store/tasksStore";
import { TaskProps } from "../../types/Task";
import styles from "./styles.module.scss";
import apiMethods from "../../services/apiMethods";

const Task = (props: TaskProps) => {
  let id = props.data.id;

  const onChangeCheckbox = async (e) => {
    props.onChangeTaskStatus(id, e.target.checked);
    apiMethods.changeCheckbox(id, e.target.checked).then(() => {
      props.getTasks();
    });
  };

  const onDelete = async () => {
    apiMethods.deleteTask(id).then(() => {
      props.getTasks();
    });
  };

  return (
    <div className={styles.taskItem}>
      <div className={styles.taskInfoColumn}>
        {" "}
        <input
          type="checkbox"
          checked={props.data.status}
          onChange={onChangeCheckbox}
        ></input>
        {props.tasks &&
        props.tasks[props.index] &&
        props.tasks[props.index].status ? (
          <p
            className={
              props.tasks[props.index].status === true ? styles.lineThrough : ""
            }
          >
            {" "}
            {props.data.text}{" "}
          </p>
        ) : (
          props.data.text
        )}{" "}
      </div>{" "}
      <div className={styles.deleteButtonColumn}>
        {" "}
        <button className={styles.deleteButton} onClick={onDelete}>
          🗑️
        </button>
      </div>
    </div>
  );
};

export default Task;
