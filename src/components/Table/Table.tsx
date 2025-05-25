import { useState } from 'react';
import styled from 'styled-components';
import './table.css';
import { FormatColumnData } from './FormatColumnData';

export type TableProps<T> = {
    data: T[];
    columns: { header: string; accessor: keyof T }[];
    enableddHeader?: boolean;
    onRowClick: (row: T) => void;
}

export const Table = <T,>({ data, columns, enableddHeader = true, onRowClick }: TableProps<T>) => {
    const [selectedRow, setSelectedRow] = useState<T | null>(null);

    const handleRowClick = (row: T) => {
        setSelectedRow(row);
        onRowClick(row);
    };

    if (!data || data.length === 0) {
        return <NoDataFound>No data available</NoDataFound>;
    }

    return (
        <table>
            {enableddHeader && (
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
                                <FormatColumnData columnName={String(column.accessor)} row={row} />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const NoDataFound = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
    padding: 20px;
    font-size: 18px;
    color: #888;
`;