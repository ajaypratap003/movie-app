import { useState, FC, useEffect } from 'react';
import styled from 'styled-components';
import './style.css';

export type StarRatingProps = {
    totalStars?: number;
    ratingNumber?: number;
    onRatingChange?: (rating: number) => void;
    readonly?: boolean;
}

type StarProps = {
    isFilled: boolean;
}

const Star: FC<StarProps> = ({ isFilled }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={[
                'star-icon',
                isFilled ? 'star-icon-filled' : '',
            ].join(' ')}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2">
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
        </svg>
    );
}

const StarRating: FC<StarRatingProps> = ({ totalStars = 5, onRatingChange, ratingNumber = 0, readonly = false }) => {
    const [rating, setRating] = useState(ratingNumber);
    const [hoveredRating, setHoveredRating] = useState<number | null>(null);

    useEffect(() => {
        setRating(ratingNumber);
        setHoveredRating(null);
    }, [ratingNumber]);

    const handleClick = (index: number) => {
        setRating(index);
        if (onRatingChange) {
            onRatingChange(index);
        }
    };

    const handleMouseEnter = (index: number) => {
        setHoveredRating(index);
    };

    const handleMouseLeave = () => {
        setHoveredRating(null);
    };

    return (
        <StarContainer>
            {Array.from({ length: totalStars }).map((_, index) => (
                <span
                    key={index}
                    tabIndex={0}
                    onMouseEnter={() => !readonly && handleMouseEnter(index)}
                    onMouseLeave={() => !readonly && handleMouseLeave()}
                    onClick={() => !readonly && handleClick(index + 1)}>
                    <Star
                        isFilled={
                            hoveredRating != null
                                ? index <= hoveredRating
                                : index < rating
                        }
                    />
                </span>
            ))}
        </StarContainer>
    );
};

export default StarRating;


const StarContainer = styled.div`
    display: flex;
    align-items: center;
`;