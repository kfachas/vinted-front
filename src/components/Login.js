import { useHistory, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Login = ({ setUser, userToken, setHideFilters }) => {
  setHideFilters(true);
  const [values, setValues] = useState({});
  const history = useHistory();

  document.body.style.backgroundColor = "#eaedee";

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      await axios
        .post(
          "https://orion-vinted-kevin-fachas.herokuapp.com/user/login",
          values
        )
        .then(
          (response) => {
            console.log(response.data);
            setUser(response.data.token);
            history.push("/");
          },
          (error) => {
            console.log(error.message);
          }
        );
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userToken);
  const handleEmailChange = (event) => {
    const value = event.target.value;
    const obj = { ...values };
    obj.email = value;
    setValues(obj);
  };
  const handlePasswordChange = (event) => {
    const value = event.target.value;
    const obj = { ...values };
    obj.password = value;
    setValues(obj);
  };
  return (
    <main className="login">
      <h3
        style={{
          backgroundColor: "white",
          padding: "10px 20px",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          textDecoration: "underline",
        }}
      >
        Connexion
      </h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handlePasswordChange}
          required
        />
        <input type="submit" value="Submit" />
      </form>
      <span style={{ padding: "20px" }}>
        Vous n'êtes pas encore inscrit ? Veuillez cliquer{" "}
        <Link to="/signup" style={{ color: "#09b0ba" }}>
          ici
        </Link>
      </span>
    </main>
  );
};

export default Login;
