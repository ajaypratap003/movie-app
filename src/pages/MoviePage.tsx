import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MovieTable, MovieSearch, MovieDetails, Loader } from '../components';
import { useFetchData } from '../hooks';
import { formatValue, generateRandomRating } from '../helpers/helper';

const MoviePage: React.FC = () => {
    const [sortBy, setSortBy] = useState<string>('');
    const [searchText, setSearchText] = useState<string>('');
    const { data = [], loading } = useFetchData<any>('https://swapi.py4e.com/api/films/?format=json');
    const [selectedRow, setSelectedRow] = useState<any>('');
    const [movies, setMovies]=useState<any>(data?.results || []);

    useEffect(() => {
        // Generate random ratings for each movie
        // This is just for demonstration purposes, you can replace it with actual ratings if available
        if (data && data.results) {
            const movies = data.results.map((item: any) => ({ ...item, rating: generateRandomRating() }));
            setMovies(movies);
        }
    }, [data?.results]);

    useEffect(()=>{
        // Filter movies whenever searchText changes
        filterMovies(searchText);
    },[searchText]);

    useEffect(()=>{
        // Sort movies wheneversortBy changes
        sortMovies(sortBy);
    },[sortBy]);

    const onChangeSortBy = (value: string) => {
        setSortBy(value);
    }

    const sortMovies = (sortBy: string) => {
        let filteredData = movies;
        if (sortBy && sortBy !== 'Sort by...') {
            filteredData = filteredData.sort((a: Record<string, any>, b: Record<string, any>) => {
                if (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string') {
                    return a[sortBy].localeCompare(b[sortBy]);
                }
                return a[sortBy] - b[sortBy];
            });
        }
        setMovies(()=>[...filteredData]);
    }

    const filterMovies = (searchText: string) => {
        let filteredData = movies;
        if (searchText) {
            filteredData = filteredData.filter((item: Record<string, any>) =>
                Object.values(item).some(val =>
                    String(val).toLowerCase().includes(searchText.toLowerCase())
                )
            );
        }else{
            // If searchText is empty, reset to original data
            filteredData = data?.results || [];
        }
        
      setMovies(()=>[...filteredData]);
    }

    const onChangeSearchText = (value: string) => {
        setSearchText(value);
    }

    const onRowClick = (row: any) => {
        setSelectedRow(row);
    }

    const title = formatValue('title', selectedRow);

    if (loading) return <Loader />;

    return (
        <>
            <MovieSearch sortBy={sortBy} searchQuery={searchText} onChangeSortBy={onChangeSortBy} onChangeSearchQuery={onChangeSearchText} />
            <HorizontalLine />
            <MovieTableWrapper>
                <MovieTable data={movies} onRowClick={onRowClick} />
                <VerticalDevider />
                <MovieDetails title={title} description={selectedRow?.opening_crawl} director={selectedRow?.director} rating={selectedRow?.rating} />
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