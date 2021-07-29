// import { useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Signup = () => {
  const [values, setValues] = useState({});
  // const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      await axios
        .post(
          "https://orion-vinted-kevin-fachas.herokuapp.com/user/signup",
          values
        )
        .then(
          (response) => {
            console.log(response);
          },
          (error) => {
            console.log(error.message);
          }
        );
    } catch (error) {
      console.log(error);
    }
  };
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
  const handlePhoneChange = (event) => {
    const value = event.target.value;
    const obj = { ...values };
    obj.phone = value;
    setValues(obj);
  };
  const handleUsernameChange = (event) => {
    const value = event.target.value;
    const obj = { ...values };
    obj.username = value;
    setValues(obj);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="email"
        placeholder="email"
        onChange={handleEmailChange}
      />
      <input
        type="text"
        name="username"
        placeholder="username"
        onChange={handleUsernameChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="phone"
        onChange={handlePhoneChange}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handlePasswordChange}
      />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default Signup;
