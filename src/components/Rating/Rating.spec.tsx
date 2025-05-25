import { render, screen } from '@testing-library/react';
import { Rating, RatingProps } from './Rating';

describe('Rating Component', () => {
    it('renders correctly with ratings', () => {
        const ratings: RatingProps['ratings'] = [
            { Source: 'Internet Movie Database', Value: '8.7/10' },
            { Source: 'Rotten Tomatoes', Value: '95%' },
        ];

        render(<Rating ratings={ratings} />);

        expect(screen.getByText('Internet Movie Database : 8.7/10')).toBeInTheDocument();
        expect(screen.getByText('Rotten Tomatoes : 95%')).toBeInTheDocument();
    });

    it('renders nothing when ratings are undefined', () => {
        render(<Rating ratings={undefined} />);

        expect(screen.queryByText(/:/)).not.toBeInTheDocument();
    });

    it('renders correctly with an empty ratings array', () => {
        render(<Rating ratings={[]} />);

        expect(screen.queryByText(/:/)).not.toBeInTheDocument();
    });

    it('renders multiple ratings with unique keys', () => {
        const ratings: RatingProps['ratings'] = [
            { Source: 'Source 1', Value: 'Value 1' },
            { Source: 'Source 2', Value: 'Value 2' },
        ];

        render(<Rating ratings={ratings} />);

        const ratingElements = screen.getAllByText(/:/);
        expect(ratingElements).toHaveLength(2);
    });
});