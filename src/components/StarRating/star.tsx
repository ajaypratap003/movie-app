import React from 'react';
import styled from 'styled-components';

interface StarRatingProps {
    rating: number; // Rating number between 0 and 5
}

const StarContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Star = styled.span<{ filled: boolean }>`
    font-size: 24px;
    color: ${({ filled }) => (filled ? '#FFD700' : '#E0E0E0')}; // Gold for filled, gray for empty
    margin-right: 4px;
`;

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const totalStars = 5;

    return (
        <StarContainer>
            {Array.from({ length: totalStars }, (_, index) => (
                <Star key={index} filled={index < rating}>
                    ★
                </Star>
            ))}
        </StarContainer>
    );
};

export default StarRating;