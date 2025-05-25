import { FC } from 'react';
import styled from 'styled-components';
import { Dropdown, DropdownOption } from '../Dropdown/Dropdown';
import { Input } from '../Input';

export type MovieSearchProps = {
    searchQuery?: string;
    onChangeSortBy: (value: string) => void;
    onChangeSearchQuery: (value: string) => void;
}

const sortByOptions: DropdownOption[] = [
    { label: 'Title', value: 'title' },
    { label: 'Release Date', value: 'release_date' },
    { label: 'Episode Id', value: 'episode_id' },
    { label: 'Rating', value: 'rating' }
];

export const MovieSearch: FC<MovieSearchProps> = ({onChangeSortBy, onChangeSearchQuery }) => {

    return (
        <MovieSearchSection>
            <Dropdown options={sortByOptions} onChange={onChangeSortBy} placeholder='Sort by...'/>
            <Input placeholder='Search movie by title or episode id' onChange={onChangeSearchQuery} />
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