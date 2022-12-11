import { globals } from "../config/globals";

const apiMethods = {
  async getTasks() {
    let response = await fetch(
      `${globals.BACKEND_URL_JSONSERVER_ADDRESS}/tasks`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    //  let data = await response.json().then((tasks) => updateTasks(tasks));
    let data = await response.json();
    return data;
  },

  async getTasksFiltered(apiCallFilterValue) {
    let response = await fetch(
      `${globals.BACKEND_URL_JSONSERVER_ADDRESS}/tasks${apiCallFilterValue}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await response.json();
    return data;
  },

  async onCreateTask(status, text) {
    let response = await fetch(
      `${globals.BACKEND_URL_JSONSERVER_ADDRESS}/tasks/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status, text: text }),
      }
    );
    let data = await response.json();
    return data;
  },

  async changeCheckbox(id, status) {
    let response = await fetch(
      `${globals.BACKEND_URL_JSONSERVER_ADDRESS}/tasks/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: status }),
      }
    );
  },

  async deleteTask(id) {
    let response = await fetch(
      `${globals.BACKEND_URL_JSONSERVER_ADDRESS}/tasks/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  },

  async login(email, password) {
    let response = await fetch(
      `${globals.BACKEND_URL_JSONAUTH_ADDRESS}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      }
    );
    let data = await response.json();
    return data;
  },
};

export default apiMethods;
