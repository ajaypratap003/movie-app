import type { Movie } from './movieSlice';
import { createSelector } from '@reduxjs/toolkit';
// Selectors for accessing the state in components
export const selectMovies = (state: { movies: Movie }) => state.movies.movies;
export const selectSortBy = (state: { movies: Movie }) => state.movies.sortBy;
export const selectSearchQuery = (state: { movies: Movie }) => state.movies.searchQuery;
export const selectFilteredMovies = (state: { movies: Movie }) => {
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

export const selectSelectedRowMovie = (state: { movies: Movie }, episodeId: string) => {
    return state.movies.movies.find(movie => movie?.episode_id === episodeId) || { title: '', opening_crawl: '', director: '', producer: '', release_date: '' };
};



