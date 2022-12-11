import { observable, action, makeObservable } from "mobx";
import Cookie from "mobx-cookie";

class GlobalStore {
  cookie = new Cookie("isAuthorized");
  public redirect = false;
  public authenticated = false;
  constructor() {
    makeObservable(this, {
      redirect: observable,
      updateRedirect: action.bound,
      cookie: observable,
      authenticated: observable,
      updateAuthenticated: action.bound,
    });
  }

  updateRedirect(value) {
    this.redirect = value;
  }

  updateAuthenticated(value) {
    this.authenticated = value;
  }
}

const globalStore = new GlobalStore();
export default globalStore;
