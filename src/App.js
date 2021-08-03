import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Header from "./components/Header";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Publish from "./containers/Publish";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Payment from "./containers/Payment";
import Cookies from "js-cookie";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [search, setSearch] = useState("");
  const [ranges, setRange] = useState({
    price: { label: "price", min: 0, max: 500, value: { min: 0, max: 500 } },
  });
  const [sortPrice, setSortPrice] = useState("price-asc");
  const [hideFilters, setHideFilters] = useState(false);
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
        ranges={ranges}
        setRange={setRange}
        sortPrice={sortPrice}
        setSortPrice={setSortPrice}
        hideFilters={hideFilters}
        setHideFilters={setHideFilters}
      />
      <Switch>
        <Route path="/payment">
          <Payment setHideFilters={setHideFilters} />
        </Route>
        <Route path="/publish">
          <Publish userToken={userToken} setHideFilters={setHideFilters} />
        </Route>
        <Route path="/login">
          <Login
            setUser={setUser}
            userToken={userToken}
            setHideFilters={setHideFilters}
          />
        </Route>
        <Route path="/signup">
          <Signup
            setUser={setUser}
            userToken={userToken}
            setHideFilters={setHideFilters}
          />
        </Route>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/">
          <Home
            search={search}
            ranges={ranges}
            sortPrice={sortPrice}
            setHideFilters={setHideFilters}
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
