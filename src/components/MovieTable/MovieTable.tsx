import { FC } from 'react';
import styled from 'styled-components';
import { Table } from '../Table';

export type MovieTableProps = {
    data: any[];
    onRowClick: (row: any) => void;
}

const columns = [
    { header: 'Episode Id', accessor: 'episode_id' },
    { header: 'Title', accessor: 'title' },
    { header: 'Rating', accessor: 'rating' },
    { header: 'Release Date', accessor: 'release_date' }
];


export const MovieTable: FC<MovieTableProps> = ({ data, onRowClick }) => {

    return (
        <MovieTableWrapper>
            <MovieTableSection>
                <Table data={data} columns={columns}  onRowClick={onRowClick} enableddHeader={false}/>
            </MovieTableSection>
        </MovieTableWrapper>
    );
}

const MovieTableWrapper = styled.div`
    flex:1;
    padding: 20px;
`

const MovieTableSection = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;