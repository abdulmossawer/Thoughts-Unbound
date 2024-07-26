import React from "react";
import tub from '../images/tub.png'

const Logo = ({ width = "100px" }) => {
  return <img src={tub} alt="Logo" className="w-20" />;
};

export default Logo;
