import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
// import { useState } from "react";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Signup from "./components/Signup";
// import Cookies from "js-cookie";

function App() {
  // const [userToken, setUserToken] = useState(null);

  // const setUser = (token) => {
  //   Cookies.get("userToken", token);
  //   setUserToken(token);
  // };

  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
