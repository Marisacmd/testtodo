import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "universal-cookie";
import { userMe } from "./services/auth";
import { observer } from "mobx-react";
import globalStore from "./store/globalStore";
import AuthPage from "./pages/AuthPage/AuthPage";
import MainScreen from "./pages/MainScreenPage/MainScreenPage";
import Loader from "./components/common/Loader/Loader";
import { AppRouterProps } from "./types/AppRouter/AppRouter";
import PrivateRoute from "./components/common/PrivateRoute/PrivateRoute";
import styles from "./basics-scss/router.module.scss";
import "./basics-scss/common.scss";

interface AppRouterState {
  isLoading: boolean;
  authenticated: boolean;
  fetched: boolean;
}

@observer
class AppRouter extends React.Component<AppRouterProps, AppRouterState> {
  child: any;
  state: { isLoading: boolean; authenticated: boolean; fetched: boolean };
  authenticated: any;
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      isLoading: true,
      authenticated: false,
      fetched: false,
    };
    this.triggerUpdate = this.triggerUpdate.bind(this);
    this.onPageReload = this.onPageReload.bind(this);
    this.onLogOut = this.onLogOut.bind(this);
    this.triggerUpdate = this.triggerUpdate.bind(this);
  }

  componentWillMount() {
    let resMe = userMe();
    if (resMe) {
      this.setState({ authenticated: true });
    } else this.setState({ authenticated: false });
  }

  async componentDidMount() {
    this.setState(
      {
        isLoading: false,
      },
      () => {}
    );
  }

  triggerUpdate() {
    this.setState({ authenticated: true });
  }

  async onLogOut() {
    const cookies = new Cookies();
    const expiresDate = new Date();
    expiresDate.setFullYear(new Date().getFullYear() + 10);
    cookies.set("isAuthorized", "false", {
      path: "/",
      expires: expiresDate,
    });
    window.location.reload();
  }

  onPageReload() {
    window.location.reload();
  }

  render() {
    if (this.state.isLoading) {
      return <div>Загружается, подождите...</div>;
    }
    return (
      <React.Suspense fallback={<Loader />}>
        {this.state.authenticated ? (
          <div className={styles.router}>
            <button className={styles.logoutButton} onClick={this.onLogOut}>
              Выйти
            </button>
          </div>
        ) : null}
        <Routes>
          <Route
            path="/mainScreen"
            element={
              <PrivateRoute
                redirectPath={"/authPage"}
                authenticated={
                  this.state.authenticated || globalStore.authenticated
                }
                onSuccessReturnChilden={true}
              >
                <MainScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute
                redirectPath={"/authPage"}
                authenticated={
                  this.state.authenticated || globalStore.authenticated
                }
                onSuccessReturnChilden={true}
              >
                <MainScreen />
              </PrivateRoute>
            }
          />
          <Route
            path="/authPage"
            element={<AuthPage triggerUpdate={this.triggerUpdate} />}
          />
        </Routes>
      </React.Suspense>
    );
  }
}

export default AppRouter;
