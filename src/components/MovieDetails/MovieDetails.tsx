import { FC } from 'react';
import styled from 'styled-components';
import Skelton from '../Skelton/Skelton';
import StarRating from '../StarRating/StarRating';
import { useFetchData } from '../../hooks';
import { IDMB_API_URL } from '../../constants/constants';
import { calculateRatingScale } from '../../helpers/helper';
import { Rating } from '../Rating';
import { Loader } from '../Loader';
import { ErrorMessage } from '../ErrorMessage';

export type MovieDetailsProps = {
    imdbId: string;
};

type MovieDetailsData = {
    Title?: string;
    Plot?: string;
    Director?: string;
    imdbRating?: string;
    Poster?: string;
    Writer?: string;
    Actors?: string;
    Language?: string;
    Country?: string;
    Awards?: string;
    Ratings?: { Source: string; Value: string }[];
}

export const MovieDetails: FC<MovieDetailsProps> = ({ imdbId, }) => {
    const { data = [], loading } = useFetchData<any>(`${IDMB_API_URL}&i=${imdbId}`);

    if (loading) return <div style={{width:'50%', height:'100%'}}><Loader/></div>;

    const { Title, Plot: Description, Director, imdbRating, Poster, Writer, Actors, Language, Country, Awards, Ratings }: MovieDetailsData = data || {};

    return (
        <MovieDetailSection>
            <MovieDetail>
                <MovieTitle>
                    {Title ? Title : <Skelton width='100%' height='30px' />}
                </MovieTitle>
                <MoviePosterContainer>
                    {!Description ? <Skelton width='100%' height='100px' /> :
                        <>
                            <MoviePoster src={Poster || 'https://tse4.mm.bing.net/th?id=OIP.YYgJscCJOLEEKRvDIslsOgAAAA&pid=Api&P=0&h=220'}></MoviePoster>
                            <MovieDescription>
                                {Description}
                            </MovieDescription>
                        </>
                    }

                </MoviePosterContainer>
                <Div>
                    {Director ? `Directed by: ${Director}` : <Skelton width='100%' height='30px' />}
                </Div>
                <Div>
                    {Writer ? `Writer: ${Writer}` : <Skelton width='100%' height='30px' />}
                </Div>
                <Div>
                    {Actors ? `Actors: ${Actors}` : <Skelton width='100%' height='30px' />}
                </Div>
                <Div>
                    {Language ? `Language: ${Language}` : <Skelton width='100%' height='30px' />}
                </Div>
                <Div>
                    {Country ? `Country: ${Country}` : <Skelton width='100%' height='30px' />}
                </Div>
                <Div>
                    {Awards ? `Awards: ${Awards}` : <Skelton width='100%' height='30px' />}
                </Div>
                <MovieRating>
                    {imdbRating ? <MovieRatingWrapper>{calculateRatingScale(Number(imdbRating))} rating: <StarRating readonly={true} totalStars={10} ratingNumber={Number(imdbRating)} /></MovieRatingWrapper> : <Skelton width='100%' height='30px' />}
                </MovieRating>
                <Rating ratings={Ratings} />
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

const Div = styled.div`
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