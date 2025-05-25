import {FC} from 'react';
import StarRating from '../StarRating/StarRating';
import { numberToRoman } from '../../helpers/helper';

export type FormatColumnDataProps = {
    row: any;
    columnName: string;
};

// FormatColumnData component to format values based on column name
export const FormatColumnData: FC<FormatColumnDataProps> = ({ row, columnName }) => {
    // Format the value based on the column name
    const formatValue = () => {
        switch (columnName) {
            case 'episode_id':
                return  `EPISODE ${row[columnName]}`;
            case 'title':
                const romanNumber = numberToRoman(row['episode_id']);
                return `EPISODE ${romanNumber} - ${row[columnName]}`;
            case 'rating':
                return <StarRating totalStars={10} ratingNumber={row['rating']} readonly={true}/>
            default:
                return row[columnName] || ''; // Return the value or an empty string if not found
        }
    };

    return <span>{formatValue()}</span>;
};