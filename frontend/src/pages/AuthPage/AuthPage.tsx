import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Cookies from "universal-cookie";
import { globals, variables } from "../../config/globals";
import { observer } from "mobx-react";
import { reaction } from "mobx";
import globalStore from "../../store/globalStore";
import styles from "./styles.module.scss";
import apiMethods from "../../services/apiMethods";

const AuthPage = (props: any) => {
  reaction(
    () => globalStore.redirect,
    (shouldDoRedirect) => {
      navigate("/mainScreen");
    }
  );

  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [redirectPath, setRedirectPath] = useState<string>("");

  let navigate = useNavigate();
  let location = useLocation();

  const useMountEffect = () =>
    useEffect(() => {
      onInit();
    }, []);

  useMountEffect();
  const cookies = new Cookies();
  const onInit = () => {
    location.state === null || undefined
      ? setRedirectPath("")
      : setRedirectPath((location.state as any).redirectPath);
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    name === "password" ? setPassword(value) : setLogin(value);
  };

  const validateAndSubmit = async (e: any) => {
    apiMethods.login(login, password).then((data) => {
      const expiresDate = new Date();
      expiresDate.setFullYear(new Date().getFullYear() + 10);

      if (data.hasOwnProperty("accessToken")) {
        globalStore.updateRedirect(true);
        globalStore.updateRedirect(false);
        cookies.set("isAuthorized", "true", {
          path: "/",
          expires: expiresDate,
        });
      }
    });
    props.triggerUpdate();
    navigate(`/mainScreen`, { replace: true });
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.logInBlock}>
        <div className={styles.heading}>To Do App ✅</div>
        <input
          name="login"
          value={login}
          className={styles.input}
          onChange={(e) => handleValueChange(e)}
        ></input>
        <input
          name="password"
          value={password}
          className={styles.input}
          onChange={(e) => handleValueChange(e)}
        ></input>
        <button
          className={styles.logInButton}
          onClick={(e: any) => validateAndSubmit(e)}
        >
          Войти
        </button>
      </div>
    </div>
  );
};

export default observer(AuthPage);
