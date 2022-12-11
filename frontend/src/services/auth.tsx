import Cookies from "universal-cookie";

export const userMe = () => {
  const cookies = new Cookies();
  let isAuthorized = cookies.get("isAuthorized");
  let result = false;
  if (isAuthorized === "true") {
    result = true;
  }
  return result;
};
