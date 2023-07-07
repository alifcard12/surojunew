import React from "react";
import CardImg from "../components/Dashboard/CardImg";
import ProgressBar from "../components/Dashboard/ProgressBar";
import Kupon from "../components/Dashboard/Kupon";
import InfoPaket from "../components/Dashboard/InfoPaket";

const Dashboard = () => {
  return (
    <div className="bg-[url('/assets/hero2.png')] bg-[length:100%_270px] bg-no-repeat">
      <div className="sm:mx-5 mx-3 mb-5 pt-5">
        <InfoPaket />
      </div>
      <div className="w-full sm:px-5 px-3 ">
        <CardImg />
        <ProgressBar />
        <Kupon />
      </div>
    </div>
  );
};

export default Dashboard;
