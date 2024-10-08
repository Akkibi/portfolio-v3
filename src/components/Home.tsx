import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "Portfolio Akira Valade";
  }, []);
  return <div></div>;
};

export default Home;
