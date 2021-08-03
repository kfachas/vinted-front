import { useHistory, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Login = ({ setUser, userToken }) => {
  const [values, setValues] = useState({});
  const history = useHistory();

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
    <>
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
      <span>
        Vous n'êtes pas encore inscrit ? Cliquez{" "}
        <Link to="/signup" style={{ color: "cyan" }}>
          ici
        </Link>
      </span>
    </>
  );
};

export default Login;
