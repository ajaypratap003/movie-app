import { FC } from 'react';
import styled from 'styled-components';
import Dropdown from '../Dropdown/Dropdowncomp';
import { Input } from '../Input';

export type MovieSearchProps = {
    sortBy: string;
    searchQuery: string;
    onChangeSortBy: (value: string) => void;
    onChangeSearchQuery: (value: string) => void;
}

const sortByOptions: string[] = [
    'Sort by...',
    'title',
    'release_date',
    'episode_id',
    'rating'
];

// const sortByOptions1: DropdownOption[] = [
//     { label: 'Title', value: 'title' },
//     { label: 'Release Date', value: 'release_date' },
//     { label: 'Episode Id', value: 'episode_id' }
// ];

export const MovieSearch: FC<MovieSearchProps> = ({ sortBy,  onChangeSortBy, searchQuery, onChangeSearchQuery }) => {

    return (
        <MovieSearchSection>
            <Dropdown value={sortBy} options={sortByOptions} onChange={onChangeSortBy} />
            <Input value={searchQuery} placeholder='Type to search...' onChange={onChangeSearchQuery} />
        </MovieSearchSection>
    );
}

const MovieSearchSection = styled.section`
    display: flex;
    flex-direction: colomn;
    margin-top: 20px;
    margin-left: 20px;
    gap: 20px;
    width: 100%
    item-align: center;
`;