import React from "react";

const Star = ({ stars }) => {
  const ratingStar = Array.from({ length: 5 }, (ele, index) => {
    let number = index + 0.5;

    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <i style={{ color: "#ffbf00" }} className="fa-solid fa-star"></i>
        ) : stars >= number ? (
          <i style={{ color: "#ffbf00" }} className="fa-solid fa-star-half-stroke"></i>
        ) : (
          <i style={{ color: "#ffbf00" }} className="fa-regular fa-star"></i>
        )}
      </span>
    );
  });

  return <>{ratingStar}</>;
};

export default Star;


