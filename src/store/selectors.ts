import type { Movie } from './movieSlice';
import { createSelector } from '@reduxjs/toolkit';

// Selectors for accessing the state in components
// Select the movies array from the state
export const selectMovies = (state: { movies: Movie }) => state.movies.movies;
// Select the sort criteria from the state
export const selectSortBy = (state: { movies: Movie }) => state.movies.sortBy;
// Select the search query from the state
export const selectSearchQuery = (state: { movies: Movie }) => state.movies.searchQuery;
const filteredMovies = (state: { movies: Movie }) => {
    const { movies, sortBy, searchQuery } = state.movies;
    let filteredMovies = [...movies];

    // Filter by search query
    if (searchQuery) {
        // Convert search query to lowercase and trim whitespace
        // This will filter movies by title or episode_id
        // You can modify the filtering logic as needed
        filteredMovies = filteredMovies?.filter((movie) => movie?.title?.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
            String(movie?.episode_id).includes(searchQuery.toLowerCase().trim()));

        // Uncomment the following lines if you want to search across all fields
        // filteredMovies = filteredMovies.filter(movie =>
        //     Object.values(movie).some(val =>
        //         String(val).toLowerCase().includes(searchQuery.toLowerCase())
        //     )
        // );
    }

    // Sort by selected criteria
    if (sortBy && sortBy !== 'Sort by...') {
        filteredMovies.sort((a, b) => {
            if (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string') {
                return a[sortBy].localeCompare(b[sortBy]);
            }
            return a[sortBy] - b[sortBy];
        });
    }

    return filteredMovies;
}
// Create a selector to get the filtered movies based on search query and sort criteria
export const selectFilteredMovies = createSelector([filteredMovies], (filteredMovies) => filteredMovies);

// Select the movie details for the selected row
const selectedRowMovie = (state: { movies: Movie }, episodeId: string) => {
    return state.movies.movies.find(movie => movie?.episode_id === episodeId) || { title: '', opening_crawl: '', director: '', producer: '', release_date: '', imdb_id:'' };
};

// Create a selector to get the selected row movie details
export const selectSelectedRowMovie = createSelector([selectedRowMovie], (selectedRow) => selectedRow);



