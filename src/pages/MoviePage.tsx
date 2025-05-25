import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MovieTable, MovieSearch, MovieDetails, Loader, ErrorMessage } from '../components';
import { useFetchData, fetchAllImdbData } from '../hooks';
import { getImdbId } from '../helpers/helper';
import { useSelector, useDispatch } from 'react-redux';
import { setMovies, setSortBy, setSearchQuery } from '../store/movieSlice';
import { selectSearchQuery, selectFilteredMovies } from '../store/selectors';
import { MOVIE_API_URL, IMDB_IDS, IDMB_API_URL } from '../constants/constants';

const MoviePage: React.FC = () => {
    const dispatch = useDispatch();
    const searchText = useSelector(selectSearchQuery);
    const filteredMovies = useSelector(selectFilteredMovies);
    const [loadingData, setLoadingData] = useState<boolean>(false);


    const { data = [], loading, error } = useFetchData<any>(MOVIE_API_URL);
    const [selectedRow, setSelectedRow] = useState<any>('');

    // Fetch IMDb data for each movie
    const fetchImdbData = async () => {
        try {
            return await fetchAllImdbData(IDMB_API_URL, IMDB_IDS);
        } catch (err) {
            console.error("Error fetching IMDb data:", err);
            return [];
        }
    };

    useEffect(() => {
        // Generate random ratings and idmb id for each movie
        // This is just for demonstration purposes, you can replace it with actual ratings if available
        if (data && data.results) {
            // Fetch IMDb data
            setLoadingData(true);
            fetchImdbData().then((imdbData) => {
                const movies = data.results.map((item: any) => {
                    // Find the corresponding IMDb data for the movie
                    const movieDetails = imdbData?.find((imdb) => imdb?.imdbID === getImdbId(item.episode_id));
                    return ({
                        ...item,
                        rating: Math.ceil(movieDetails?.imdbRating),
                        imdb_id: getImdbId(item.episode_id)
                    })
                });
                setLoadingData(false);
                // Dispatch the movies to the Redux store
                dispatch(setMovies(movies));
            });
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

    if (loading || loadingData) return <Loader />;

    return (
        <>
            <MovieSearch searchQuery={searchText} onChangeSortBy={onChangeSortBy} onChangeSearchQuery={onChangeSearchText} />
            {error && <ErrorMessage message={error} />}
            <HorizontalLine />
            <MovieTableWrapper>
                <MovieTable data={filteredMovies} onRowClick={onRowClick} />
                <VerticalDevider error={error || ''} />
                <MovieDetails imdbId={selectedRow?.imdb_id} />
            </MovieTableWrapper>
        </>
    );
};

export default MoviePage;

const MovieTableWrapper = styled.div`
    display: flex;
    height: 100vh
`
const VerticalDevider = styled.div<{ error?: string }>`
    border-left: 1px solid #ccc; 
    height: 100%;
    position: absolute;
    left: 50%;
    marginLeft: -3px; 
    top: 0;
    margin-top:  ${props => props.error ? '115px' : '85px'};
`

const HorizontalLine = styled.hr`
    color: #ccc;
    border-width: 0.5px;
    width: 100%;
`;