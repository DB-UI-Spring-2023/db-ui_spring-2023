import React, { useMemo } from "react";
import PropTypes from "prop-types";
import {StarIcon} from "@chakra-ui/icons";

const Rate = ({count, rating, color, onRating }) => {
    const [hoverRating, setHoverRating] = React.useState(0);
    const getColor = (idx) => {
        if (hoverRating >= idx) {
            return color.filled;
        } else if(!hoverRating && rating >= idx) {
            return color.filled;
        }
        return color.unfilled;
    }

    const starRate = useMemo(() => {
        return Array(count)
            .fill(0)
            .map((_, i) => i +1) 
            .map(idx => 
                <StarIcon
                    key={idx}
                    className="cursor-pointer"
                    icon="star"
                    onClick={() => onRating(idx)}
                    style={{color: getColor(idx)}}
                    onMouseEnter={() => setHoverRating(idx)}
                    onMouseLeave={() => setHoverRating(0)}
                />
            );
    },[count, rating, color, onRating, hoverRating]);
    return (
        <div>
            {starRate}
        </div>

    )
};

Rate.propTypes = {
    count: PropTypes.number,
    rating: PropTypes.number,
    color: {
        filled: PropTypes.string,
        unfilled: PropTypes.string
    },
    onRating: PropTypes.func
}

Rate.defaultProps = {
    count: 5,
    rating: 0,
    color: {
        filled: "#f00",
        unfilled: "#ddd"
    },
    // onRating: () => {}
}

export default Rate;