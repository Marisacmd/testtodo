import React, { ChangeEvent, useEffect, useState } from "react";
import { globals } from "../../config/globals";
import ModalCreateTask from "../../components/ModalCreateTask/ModalCreateTask";
import tasksStore from "../../store/tasksStore";
import Task from "../../components/Task/Task";
import styles from "./styles.module.scss";
import apiMethods from "../../services/apiMethods";

const AuthPage = () => {
  const filterOptions = ["All", "Done", "Undone"];
  const [selectedFilter, changeSelectedFilter] = useState("All");
  const [tasks, updateTasks] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);

  useEffect(() => {
    if (showPopUp === false) {
      tasksStore.setTaskText("");
    }
  }, [showPopUp]);

  const getTasks = async () => {
    return apiMethods.getTasks().then((tasks) => updateTasks(tasks));
  };

  const getApiCallFilterValue = () => {
    let filter = "";
    let prefix = "?status=";
    if (selectedFilter === "Undone") {
      filter = prefix + "false";
    }
    if (selectedFilter === "Done") {
      filter = prefix + "true";
    }
    return filter;
  };

  const getTasksFiltered = async () => {
    return apiMethods
      .getTasksFiltered(getApiCallFilterValue())
      .then((tasks) => updateTasks(tasks));
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleChangeFilter = (value) => {
    changeSelectedFilter(value);
  };

  useEffect(() => {
    getTasksFiltered();
  }, [selectedFilter]);

  const createTask = () => {
    setShowPopUp(true);
  };

  const onSetShowPopUp = () => {
    setShowPopUp(false);
  };

  const onChangeTaskStatus = (id, value) => {
    let taskIndex = tasks.findIndex((task) => task.id == id);
    let newArr = tasks;
    newArr[taskIndex].status = value;
    updateTasks(newArr);
  };

  const onCreateTask = async () => {
    apiMethods.onCreateTask(false, tasksStore.taskText).then(() => {
      tasksStore.setTaskText("");
      setShowPopUp(false);
      getTasks();
    });
  };

  return (
    <div className={styles.mainScreen}>
      <div className={styles.buttonsBlock}>
        {" "}
        <button className={styles.addButton} onClick={createTask}>
          ➕ Add
        </button>
        <select
          className={styles.statusSelect}
          onChange={(e) => handleChangeFilter(e.target.value)}
        >
          {filterOptions.map((item, key) => (
            <option key={key} value={item}>
              {" "}
              {item}
            </option>
          ))}{" "}
        </select>
      </div>
      <div className={styles.tasksList}>
        {tasks.map((item, index) => (
          <Task
            data={item}
            index={index}
            tasks={tasks}
            getTasks={getTasks}
            onChangeTaskStatus={onChangeTaskStatus}
          />
        ))}
      </div>
      <ModalCreateTask
        show={showPopUp}
        onSetShow={onSetShowPopUp}
        onCreate={onCreateTask}
      />
    </div>
  );
};

export default AuthPage;
