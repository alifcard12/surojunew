import React from "react";
import { Link } from "react-router-dom";
import ButtonAtom from "../../atoms/ButtonAtom";

const Home = () => {
  return (
    <div>
      Home
      <Link to="/login">
        <ButtonAtom text="Login" color="blue" />
      </Link>
    </div>
  );
};

export default Home;
