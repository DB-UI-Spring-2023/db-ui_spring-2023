import axios from "axios";
import { HomePage, Dashboard } from "./webpages";
import { Router } from "./Routes";

export const App = () => {
  const url = "localhost://8000";

  const checkAPI = () => {
    axios
      .get(url + "/")
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Router />
    </>
  );
};
