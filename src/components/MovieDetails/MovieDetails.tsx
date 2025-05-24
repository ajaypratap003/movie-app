import { FC } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Skelton from '../Skelton/Skelton';
import StarRating from '../StarRating/StarRating';
import { selectSelectedRowMovie } from '../../store/selectors';
import type { Movie } from '@app/store/movieSlice';
import { formatValue } from '../../helpers/helper';


export type MovieDetailsProps = {
    selectedEpisodeId: string;
};

export const MovieDetails: FC<MovieDetailsProps> = ({ selectedEpisodeId }) => {
    const selectedRow = useSelector((state: { movies: Movie }) => selectSelectedRowMovie(state, selectedEpisodeId));
    const { title, opening_crawl: description, director, rating } = selectedRow;
    const formattedTitle = formatValue('title', selectedRow);

    return (
        <MovieDetailSection>
            <MovieDetail>
                <MovieTitle>
                    {title ? formattedTitle : <Skelton width='100%' height='30px' />}
                </MovieTitle>
                <MoviePosterContainer>
                    {!description ? <Skelton width='100%' height='100px' /> :
                        <>
                            <MoviePoster src='https://m.media-amazon.com/images/M/MV5BMzczODY2ZmMtYjU4MS00MzFjLTk2YTAtYTMyMmFlNTk3OTIyXkEyXkFqcGc@._V1_SX300.jpg'></MoviePoster>
                            <MovieDescription>
                                {description}
                            </MovieDescription>
                        </>
                    }

                </MoviePosterContainer>
                <MovieDirector>
                    {director ? `Directed by: ${director}` : <Skelton width='100%' height='30px' />}
                </MovieDirector>
                <MovieRating>
                    {director ? <MovieRatingWrapper>Average rating: <StarRating readonly={true} totalStars={10} ratingNumber={rating} /></MovieRatingWrapper> : <Skelton width='100%' height='30px' />}
                </MovieRating>
            </MovieDetail>
        </MovieDetailSection>
    );
}

const MovieDetailSection = styled.section`
    flex: 1;
    padding: 10px
`

const MovieDetail = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const MoviePoster = styled.img`
    width: 100%;
    max-width: 100px;
    height: auto;
    margin-bottom: 20px;
    @media (min-width: 768px) {
        margin-bottom: 0;
    }
`;

const MoviePosterContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px
`

const MovieTitle = styled.div`
    font-size: 20px;
    margin-bottom: 10px;
`;

const MovieDescription = styled.span`
    text-align: center;
    @media (min-width: 768px) {
        text-align: left;
    }
`;

const MovieDirector = styled.div`
    margin-top: 10px;
`;

const MovieRatingWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`

const MovieRating = styled.div`
    margin-top: 10px;
`;