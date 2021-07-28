import { Link } from "react-router-dom";
import logo from "../Vinted_logo.png";
const Header = () => {
  return (
    <header>
      <Link to="/home">
        <img src={logo} alt="Vinted" />
      </Link>
      <input type="text" placeholder="Recherche des articles" />
      <div>
        <button>S'inscrire</button>
        <button>Se connecter</button>
      </div>
      <div>
        <button>Vends tes articles</button>
      </div>
    </header>
  );
};

export default Header;
