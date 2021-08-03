import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../Vinted_logo.png";
import RangeBar from "./RangeBar";

const Header = ({
  setUser,
  setSearch,
  state,
  setState,
  sortPrice,
  setSortPrice,
  pageOffer,
  setPageOffer,
}) => {
  const onChange = (data) => {
    setState({
      [data.type]: {
        ...state[data.type],
        value: data.value,
      },
    });
  };
  const handleChange = (elem) => {
    const value = elem.target.value;
    setSearch(value);
  };
  return (
    <header>
      <Link to="/home">
        <img src={logo} alt="Vinted" />
      </Link>
      <div className="filters">
        <input
          type="text"
          placeholder="Recherche des articles"
          onChange={handleChange}
        />
        {pageOffer && (
          <div>
            <div className="sortPrice">
              <span>Trier par prix :</span>
              <button
                onClick={() => {
                  if (sortPrice === "price-asc") {
                    setSortPrice("price-desc");
                  } else {
                    setSortPrice("price-asc");
                  }
                }}
              >
                {sortPrice === "price-desc" ? ">" : "<"}
              </button>
            </div>
            <RangeBar state={state} setState={setState} onChange={onChange} />
          </div>
        )}
      </div>
      <div>
        {Cookies.get("userToken") !== "undefined" ? (
          <Link to="/redirect">
            <button
              className="disconnectBtn"
              onClick={() => {
                Cookies.remove("userToken");
                setUser();
              }}
            >
              Se déconnecter
            </button>
          </Link>
        ) : (
          <Link to="/signup">
            <button className="headerBtn" style={{ marginRight: "10px" }}>
              S'inscrire
            </button>
          </Link>
        )}
        {Cookies.get("userToken") === "undefined" && (
          <button className="headerBtn">
            <Link to="/login">Se connecter</Link>
          </button>
        )}
      </div>
      <div>
        <Link
          to={Cookies.get("userToken") !== "undefined" ? "/publish" : "/login"}
        >
          <button className="headerBtn" id="lastBtnHeader">
            Vends tes articles
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
