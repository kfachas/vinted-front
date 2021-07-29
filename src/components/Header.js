import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../Vinted_logo.png";
const Header = ({ margin }) => {
  return (
    <header style={{ marginBottom: margin }}>
      <Link to="/home">
        <img src={logo} alt="Vinted" />
      </Link>
      <input type="text" placeholder="Recherche des articles" />
      <div>
        <Link to="/signup">
          <button>SIGN UP</button>
        </Link>
        <button>{Cookies.get("token") ? "Mon profil" : "Se connecter"}</button>
      </div>
      <div>
        <button>Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
