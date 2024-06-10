import React, { useState, useEffect } from "react";
import rgbToHex from "../utils";

const SingleColor = ({ rgb, weight, hex, color }) => {
  const [isCoppied, setIsCoppied] = useState(false);

  useEffect(() => {
    let id = setTimeout(() => setIsCoppied(false), 3000);
    return () => clearTimeout(id);
  }, [isCoppied]);
  const brgb = rgb.join(",");
  return (
    <article
      className={`color, ${color && "color-light"}`}
      style={{ backgroundColor: `rgb(${brgb})`, color: color }}
      onClick={() => {
        navigator.clipboard.writeText(rgbToHex(...rgb));
        setIsCoppied(true);
      }}
    >
      <p className="percent-value">{weight}%</p>
      <p className="color-value">#{hex}</p>
      {isCoppied && <p className="alert">Coppied</p>}
    </article>
  );
};

export default SingleColor;
