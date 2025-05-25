import { render, screen, fireEvent } from '@testing-library/react';
import { MovieSearch, MovieSearchProps } from './MovieSearch';

describe('MovieSearch Component', () => {
    const mockOnChangeSortBy = jest.fn();
    const mockOnChangeSearchQuery = jest.fn();

    const defaultProps: MovieSearchProps = {
        searchQuery: '',
        onChangeSortBy: mockOnChangeSortBy,
        onChangeSearchQuery: mockOnChangeSearchQuery,
    };

    it('should call onChangeSearchQuery when the search input changes', () => {
        render(<MovieSearch {...defaultProps} />);
        const input = screen.getByPlaceholderText('Search movie by title or episode id');
        fireEvent.change(input, { target: { value: 'Star Wars' } });
        expect(mockOnChangeSearchQuery).toHaveBeenCalledWith('Star Wars');
    });

    it('should display the correct search query in the input field', () => {
        render(<MovieSearch {...defaultProps} searchQuery="Test Query" />);
        const input = screen.getByPlaceholderText('Search movie by title or episode id');
        expect(input).toHaveValue('Test Query');
    });
});