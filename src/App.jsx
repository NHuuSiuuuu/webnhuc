import React, { useEffect } from "react";
import AllRoute from "./components/AllRoute";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function App() {
  const fetchApi = async () => {
    const res = await axios.get(
      `${import.meta.env.REACT_API_BACKEND}/api/product/products`
    );
    console.log("res:", res);
  };
  const query = useQuery({ queryKey: ["todos"], queryFn: fetchApi });
  console.log("query: ", query);

  // useEffect(() => {
  //   fetchApi();
  // }, []);

  return <AllRoute />;
}

export default App;
