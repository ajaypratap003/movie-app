import { render, screen } from '@testing-library/react';
import { MovieDetails } from './MovieDetails';
import { useFetchData } from '../../hooks';
import { Loader } from '../Loader';
import Skelton from '../Skelton/Skelton';
import StarRating from '../StarRating/StarRating';

jest.mock('../../hooks', () => ({
    useFetchData: jest.fn(),
}));

jest.mock('../Loader', () => ({
    Loader: () => <div data-testid="loader">Loading...</div>,
}));

jest.mock('../Skelton/Skelton', () => ({
    __esModule: true,
    default: ({ width, height }: { width: string; height: string }) => (
        <div data-testid="skeleton" style={{ width, height }}></div>
    ),
}));

jest.mock('../StarRating/StarRating', () => ({
    __esModule: true,
    default: ({ readonly, totalStars, ratingNumber }: { readonly: boolean; totalStars: number; ratingNumber: number }) => (
        <div data-testid="star-rating">{`Rating: ${ratingNumber}/${totalStars}`}</div>
    ),
}));

describe('MovieDetails Component', () => {
    const mockData = {
        Title: 'Inception',
        Plot: 'A mind-bending thriller.',
        Director: 'Christopher Nolan',
        imdbRating: '8.8',
        Poster: 'https://example.com/poster.jpg',
        Writer: 'Jonathan Nolan',
        Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt',
        Language: 'English',
        Country: 'USA',
        Awards: 'Oscar-winning',
        Ratings: [{ Source: 'Internet Movie Database', Value: '8.8/10' }],
    };

    it('should render the loader when loading', () => {
        (useFetchData as jest.Mock).mockReturnValue({ data: null, loading: true });

        render(<MovieDetails imdbId="tt1375666" />);

        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('should render movie details when data is available', () => {
        (useFetchData as jest.Mock).mockReturnValue({ data: mockData, loading: false });

        render(<MovieDetails imdbId="tt1375666" />);

        expect(screen.getByText('Inception')).toBeInTheDocument();
        expect(screen.getByText('A mind-bending thriller.')).toBeInTheDocument();
        expect(screen.getByText('Directed by: Christopher Nolan')).toBeInTheDocument();
        expect(screen.getByText('Writer: Jonathan Nolan')).toBeInTheDocument();
        expect(screen.getByText('Actors: Leonardo DiCaprio, Joseph Gordon-Levitt')).toBeInTheDocument();
        expect(screen.getByText('Language: English')).toBeInTheDocument();
        expect(screen.getByText('Country: USA')).toBeInTheDocument();
        expect(screen.getByText('Awards: Oscar-winning')).toBeInTheDocument();
        expect(screen.getByTestId('star-rating')).toHaveTextContent('Rating: 8.8/10');
    });

    it('should render skeletons when data is not fully available', () => {
        (useFetchData as jest.Mock).mockReturnValue({ data: {}, loading: false });

        render(<MovieDetails imdbId="tt1375666" />);

        expect(screen.getAllByTestId('skeleton')).toHaveLength(9); // 9 skeleton placeholders
    });

    it('should render a fallback poster when no poster is available', () => {
        (useFetchData as jest.Mock).mockReturnValue({ data: { ...mockData, Poster: undefined }, loading: false });

        render(<MovieDetails imdbId="tt1375666" />);

        const fallbackPoster = screen.getByRole('img') as HTMLImageElement;
        expect(fallbackPoster.src).toContain('https://tse4.mm.bing.net/th?id=OIP.YYgJscCJOLEEKRvDIslsOgAAAA&pid=Api&P=0&h=220');
    });
});