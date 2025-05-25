import { IMDB_IDS } from '../constants/constants';

// Helper functions for various utilities
export const numberToRoman = (num: number): string => {
    if (num === 0) return 'N/A';
    const romanNumList: { [key: number]: string } = {
        1: 'I',
        2: 'II',
        3: 'III',
        4: 'IV',
        5: 'V',
        6: 'VI',
        7: 'VII',
        8: 'VIII',
        9: 'IX',
        10: 'X'
    };
    let romanNum = '';
    let i;
    let numLen = num ? num.toString().length : 0;
    for (i = numLen; i > 0; i--) {
        let divisor = Math.pow(10, i - 1);
        let currentNum = Math.floor(num / divisor);
        if (currentNum === 0) {
            if (num > 0) {
                num = num % divisor;
                continue;
            }
        }
        romanNum += romanNumList[currentNum * divisor];
        num = num % divisor;
    }
    return romanNum;
}

// Parse lines from a string by replacing escaped newline characters with actual newlines
export const parseLines = (value: string) => value.replace(/(\\n)/g, "\n");

// Generate a random rating between 0 and 10
export const generateRandomRating = (): number => {
    return parseInt((Math.random() * 10).toFixed(1));
};

// Get IMDB ID based on episode ID
export const getImdbId = (episodeId: number): string => {
    const imdbId = IMDB_IDS.find(item => item.episode_id === episodeId);
    return imdbId ? imdbId.imdb_id : '';
}

// Calculate movie rating scale based on rating number
export const calculateRatingScale = (rating: number): string => {
    if (rating >= 8) {
        return 'Excellent';
    } else if (rating >= 6) {
        return 'Good';
    } else if (rating >= 4) {
        return 'Average';
    } else if (rating >= 2) {
        return 'Poor';
    } else {
        return 'Terrible';
    }
};