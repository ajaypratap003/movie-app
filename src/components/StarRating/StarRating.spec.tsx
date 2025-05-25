import { render, screen, fireEvent } from '@testing-library/react';
import StarRating, { StarRatingProps } from './StarRating';

describe('StarRating Component', () => {
    const defaultProps: StarRatingProps = {
        totalStars: 5,
        ratingNumber: 3,
        onRatingChange: jest.fn(),
        readonly: false,
    };

    it('renders the correct number of stars', () => {
        render(<StarRating {...defaultProps} />);
        const stars = screen.getByTestId('star-rating');
        const filledStars = stars.querySelectorAll('.star-icon-filled');
        expect(filledStars).toHaveLength(defaultProps.ratingNumber!);
        const totalStars = stars.querySelectorAll('.star-icon');
        expect(totalStars).toHaveLength(defaultProps.totalStars!);
    });

    it('renders the correct number of filled stars based on ratingNumber', () => {
        render(<StarRating {...defaultProps} />);
        const filledStars = document.querySelectorAll('.star-icon-filled');
        expect(filledStars).toHaveLength(defaultProps.ratingNumber!);
    });
});