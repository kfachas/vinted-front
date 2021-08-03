import { useHistory, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Signup = ({ setUser, userToken }) => {
  const [values, setValues] = useState({});
  const [picture, setPicture] = useState();
  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("email", values.email);
      formData.append("username", values.username);
      formData.append("phone", values.phone);
      formData.append("password", values.password);
      await axios
        .post(
          "https://orion-vinted-kevin-fachas.herokuapp.com/user/signup",
          formData,
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then(
          (response) => {
            console.log(response.data);
            setUser(response.data.token);
            history.push("/");
          },
          (error) => {
            console.log(error.response);
            console.log(error.message);
          }
        );
    } catch (error) {
      console.log(error);
    }
  };
  console.log(userToken);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={(event) => {
            setPicture(event.target.files[0]);
          }}
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={(event) => {
            const obj = { ...values };
            obj.email = event.target.value;
            setValues(obj);
          }}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(event) => {
            const obj = { ...values };
            obj.username = event.target.value;
            setValues(obj);
          }}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="phone"
          onChange={(event) => {
            const obj = { ...values };
            obj.phone = event.target.value;
            setValues(obj);
          }}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(event) => {
            const obj = { ...values };
            obj.password = event.target.value;
            setValues(obj);
          }}
          required
        />
        <input type="submit" value="Submit" />
      </form>
      <span>
        Vous êtes déjà inscrit ? Cliquez
        <Link to="/login" style={{ color: "cyan" }}>
          ici
        </Link>
      </span>
    </>
  );
};

export default Signup;
