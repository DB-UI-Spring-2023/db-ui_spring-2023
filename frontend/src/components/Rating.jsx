import React from "react";
import "../css/Rating.css";

export default function Rating({ value }) {
  return (
    <>
      <span className="stars">
        {[1, 2, 3, 4, 5].map((x) => {
          const starType =
            x <= value
              ? "full-star"
              : x - 0.5 <= value
              ? "half-star"
              : "empty-star";
          return <i key={x} className={starType}></i>;
        })}
      </span>
    </>
  );
}
