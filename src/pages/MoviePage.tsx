import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MovieTable, MovieSearch, MovieDetails, Loader } from '../components';
import { useFetchData } from '../hooks';
import { generateRandomRating } from '../helpers/helper';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies, setSortBy, setSearchQuery } from '../store/movieSlice';
import { selectSortBy, selectSearchQuery, selectFilteredMovies } from '../store/selectors';
import { MOVIE_API_URL } from '../constants/constants';

const MoviePage: React.FC = () => {
    const dispatch = useDispatch();
    const sortBy = useSelector(selectSortBy);
    const searchText = useSelector(selectSearchQuery);
    const filteredMovies = useSelector(selectFilteredMovies);


    const { data = [], loading } = useFetchData<any>(MOVIE_API_URL);
    const [selectedRow, setSelectedRow] = useState<any>('');

    useEffect(() => {
        // Generate random ratings for each movie
        // This is just for demonstration purposes, you can replace it with actual ratings if available
        if (data && data.results) {
            const movies = data.results.map((item: any) => ({ ...item, rating: generateRandomRating() }));
            dispatch(setMovies(movies));
        }
    }, [data?.results]);

    const onChangeSortBy = (value: string) => {
        dispatch(setSortBy(value));
    }

    const onChangeSearchText = (value: string) => {
        dispatch(setSearchQuery(value));
    }

    const onRowClick = (row: any) => {
        setSelectedRow(row);
    }

    if (loading) return <Loader />;

    return (
        <>
            <MovieSearch sortBy={sortBy} searchQuery={searchText} onChangeSortBy={onChangeSortBy} onChangeSearchQuery={onChangeSearchText} />
            <HorizontalLine />
            <MovieTableWrapper>
                <MovieTable data={filteredMovies} onRowClick={onRowClick} />
                <VerticalDevider />
                <MovieDetails selectedEpisodeId={selectedRow?.episode_id} />
            </MovieTableWrapper>
        </>
    );
};

export default MoviePage;

const MovieTableWrapper = styled.div`
    display: flex;
    height: 100vh
`
const VerticalDevider = styled.div`
    border-left: 1px solid #ccc; 
    height: 100%;
    position: absolute;
    left: 50%;
    marginLeft: -3px; 
    top: 0;
    margin-top: 85px;
`

const HorizontalLine = styled.hr`
    color: #ccc;
    border-width: 0.5px;
    width: 100%;
`;