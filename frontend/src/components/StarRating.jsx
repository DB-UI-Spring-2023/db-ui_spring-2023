import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ maxStars, onRatingChange }) => {
  const [hover, setHover] = useState(null);
  const [rating, setRating] = useState(0);

  const handleClick = (index) => {
    setRating(index + 1);
    if (onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <Box>
      {Array.from({ length: maxStars }, (_, index) => (
        <FaStar
          key={index}
          size={20}
          color={index + 1 <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
          onMouseEnter={() => setHover(index + 1)}
          onMouseLeave={() => setHover(null)}
          onClick={() => handleClick(index)}
          style={{ marginRight: "0.2rem", cursor: "pointer" }}
        />
      ))}
    </Box>
  );
};

export default StarRating;
