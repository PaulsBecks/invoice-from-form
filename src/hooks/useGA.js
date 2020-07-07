import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReactGA from "react-ga";

ReactGA.initialize("UA-148033321-3");
export default function useGA() {
  const history = useHistory();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      ReactGA.pageview(history.location.pathname + history.location.search);
    }
  }, [history]);
}
