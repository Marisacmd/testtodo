import { observable, action, makeObservable } from "mobx";

class GlobalStore {
  public redirect = false;
  public authenticated = false;
  constructor() {
    makeObservable(this, {
      redirect: observable,
      updateRedirect: action.bound,
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
