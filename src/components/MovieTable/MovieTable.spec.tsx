import { render, screen, fireEvent } from '@testing-library/react';
import { MovieTable, MovieTableProps } from './MovieTable';

describe('MovieTable Component', () => {
    const mockData = [
        { episode_id: 1, title: 'A New Hope', rating: 8.6, release_date: '1977-05-25' },
        { episode_id: 2, title: 'The Empire Strikes Back', rating: 8.7, release_date: '1980-05-21' },
    ];

    const mockOnRowClick = jest.fn();

    const renderComponent = (props: Partial<MovieTableProps> = {}) => {
        const defaultProps: MovieTableProps = {
            data: mockData,
            onRowClick: mockOnRowClick,
            ...props,
        };
        return render(<MovieTable {...defaultProps} />);
    };

    it('should render the correct number of rows', () => {
        renderComponent();

        const rows = screen.getAllByRole('row');
        // Including the header row
        expect(rows.length).toBe(mockData.length);
    });

    it('should render empty state when no data is provided', () => {
        renderComponent({ data: [] });

        expect(screen.getByText('No data available')).toBeInTheDocument();
    });
});