import { observable, action, makeObservable } from "mobx";
import Cookie from "mobx-cookie";

class TasksStore {
  public taskText = "";
  constructor() {
    makeObservable(this, {
      taskText: observable,
      setTaskText: action.bound,
    });
  }
  setTaskText(value) {
    this.taskText = value;
  }
}

const tasksStore = new TasksStore();
export default tasksStore;
