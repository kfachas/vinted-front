import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { axios } from "axios";
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const id = "23230203290302";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://orion-vinted-kevin-fachas.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div>
      Home
      <Link to={`offer/${id}`}>Products</Link>
    </div>
  );
};

export default Home;
