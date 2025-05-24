import { FC } from 'react';
import styled from 'styled-components';
import Skelton from '../Skelton/Skelton';
import StarRating from '../StarRating/StarRating';

export type MovieDetailsProps = {
    title: string;
    director: string;
    description: string;
    rating?: number;
    posterUrl?: string;
};

export const MovieDetails: FC<MovieDetailsProps> = ({ title, description, director, rating }) => {

    return (
        <div style={{ flex: 1, padding: '20px' }}>
            <MovieDetail>
                <MovieTitle>
                    {title ? title : <Skelton width='100%' height='30px' />}
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
                    {director ?  `Directed by: ${director}`: <Skelton width='100%' height='30px' />}
                </MovieDirector>
                <MovieRating>
                {director ?  <MovieRatingWrapper>Average rating: <StarRating readonly={true} totalStars={10} ratingNumber={rating}/></MovieRatingWrapper>: <Skelton width='100%' height='30px' />}
                </MovieRating>
            </MovieDetail>
        </div>
    );
}

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

const MovieRatingWrapper= styled.div`
    display: flex;
    flex-direction: row;
    gap: 10px;
`

const MovieRating = styled.div`
    margin-top: 10px;
`;