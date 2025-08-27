import React from "react";

const StarburstMatch = ({ text = "You got match!" }) => (
  <svg data-testid="match-popup"     width="320" height="200" viewBox="0 0 320 200" style={{ position: "absolute", left: "50%", top: "40%", transform: "translate(-50%, -50%)" }}>
    <polygon
      points="160,10 190,40 230,20 220,60 270,60 240,90 280,120 230,120 240,160 190,130 160,160 130,130 80,160 90,120 40,120 80,90 50,60 100,60 90,20 130,40"
      fill="#ddebf9"
      stroke="#161a1d"
      strokeWidth="2"
            transform="rotate(-15 160 80)"  

    />
    <text
      x="160"
      y="100"
      fontSize="20"
      textAnchor="middle"
      fill="#222"
      fontFamily="Arial, sans-serif"
    >
      {text}
    </text>
  </svg>
);

export default StarburstMatch;