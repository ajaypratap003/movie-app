import { render, screen, fireEvent } from '@testing-library/react';
import { Table, TableProps } from './Table';

type TestData = {
    id: number;
    name: string;
    age: number;
};

const mockData: TestData[] = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
];

const mockColumns = [
    { header: 'ID', accessor: 'id' as keyof TestData },
    { header: 'Name', accessor: 'name' as keyof TestData },
    { header: 'Age', accessor: 'age' as keyof TestData },
];

const mockOnRowClick = jest.fn();

const renderTable = (props: Partial<TableProps<TestData>> = {}) => {
    const defaultProps: TableProps<TestData> = {
        data: mockData,
        columns: mockColumns,
        enableddHeader: true,
        onRowClick: mockOnRowClick,
        ...props,
    };
    return render(<Table {...defaultProps} />);
};

describe('Table Component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders table with data and columns', () => {
        renderTable();
        expect(screen.getByText('ID')).toBeInTheDocument();
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Age')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    it('renders "No data available" when data is empty', () => {
        renderTable({ data: [] });
        expect(screen.getByText('No data available')).toBeInTheDocument();
    });

    it('does not render header when enableddHeader is false', () => {
        renderTable({ enableddHeader: false });
        expect(screen.queryByText('ID')).not.toBeInTheDocument();
        expect(screen.queryByText('Name')).not.toBeInTheDocument();
        expect(screen.queryByText('Age')).not.toBeInTheDocument();
    });

    it('calls onRowClick when a row is clicked', () => {
        renderTable();
        const row = screen.getByText('John Doe').closest('tr');
        fireEvent.click(row!);
        expect(mockOnRowClick).toHaveBeenCalledWith(mockData[0]);
    });

    it('highlights the selected row when clicked', () => {
        renderTable();
        const row = screen.getByText('John Doe').closest('tr');
        fireEvent.click(row!);
        expect(row).toHaveStyle('background-color: #f5f5f5');
    });
});