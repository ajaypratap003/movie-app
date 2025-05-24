import { useState } from 'react';
import './table.css';
import StarRating from '../../components/StarRating/StarRating'

export type TableProps<T> = {
    data: T[];
    columns: { header: string; accessor: keyof T }[];
    disableddHeader?: boolean;
    prepareRow: (name: string, row: T) => string;
    onRowClick: (row: T) => void;
}

export const Table = <T,>({ data, columns, disableddHeader = false, prepareRow, onRowClick }: TableProps<T>) => {
    const [selectedRow, setSelectedRow] = useState<T | null>(null);

    const handleRowClick = (row: T) => {
        setSelectedRow(row);
        onRowClick(row);
    };

    if (!data || data.length === 0) {
        return <div className="no-data">No data available</div>;
    }

    return (
        <table>
            {disableddHeader && (
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={String(column.accessor)}>{column.header}</th>
                        ))}
                    </tr>
                </thead>
            )}
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} onClick={() => handleRowClick(row)} style={{ backgroundColor: selectedRow === row ? '#f5f5f5' : '' }}>
                        {columns.map((column) => (
                            <td key={String(column.accessor)}>
                              {column.accessor==='rating' ? <StarRating readonly={true} totalStars={10} ratingNumber={Number(row[column.accessor])}/>:prepareRow(String(column.accessor), row)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};