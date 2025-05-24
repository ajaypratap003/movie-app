import {createSlice} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Movie = {
   movies: any[];
   sortBy: string;
   searchQuery: string;
};  

const initialState: Movie = {   
    movies: [],
    sortBy: 'Sort by...',
    searchQuery: ''
};

const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies: (state, action: PayloadAction<any[]>) => {
            state.movies = action.payload;
        },
        setSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        }
    }
});

export const { setMovies, setSortBy, setSearchQuery } = movieSlice.actions;
export default movieSlice.reducer;
