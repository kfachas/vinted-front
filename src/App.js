import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Publish from "./containers/Publish";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Cookies from "js-cookie";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [search, setSearch] = useState("");
  const [state, setState] = useState({
    price: { label: "price", min: 0, max: 100, value: { min: 0, max: 100 } },
  });
  const [sortPrice, setSortPrice] = useState("price-asc");
  const [pageOffer, setPageOffer] = useState(true);
  const setUser = (token) => {
    Cookies.set("userToken", token);
    setUserToken(token);
  };

  return (
    <Router>
      <Header
        userToken={userToken}
        setUser={setUser}
        setSearch={setSearch}
        state={state}
        setState={setState}
        sortPrice={sortPrice}
        setSortPrice={setSortPrice}
        pageOffer={pageOffer}
        setPageOffer={setPageOffer}
      />
      <Switch>
        <Route path="/publish">
          <Publish />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} userToken={userToken} />
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} userToken={userToken} />
        </Route>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/">
          <Home
            search={search}
            state={state}
            sortPrice={sortPrice}
            setPageOffer={setPageOffer}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
