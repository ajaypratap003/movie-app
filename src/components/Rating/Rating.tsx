
import { FC } from 'react';
import styled from 'styled-components';

type RatingType = {
    Source: string;
    Value: string;
};

export type RatingProps = {
    ratings: RatingType[] | undefined;
};

export const Rating: FC<RatingProps> = ({ ratings }) => {

    return (
        <RatingSection>
            {ratings?.map(({ Source, Value }, index) => (
                <RatingWrapper key={index}>
                    {Source} : {Value}
                </RatingWrapper>
            ))}
        </RatingSection>
    );
}

const RatingSection = styled.section`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
    gap: 5px;
    width: 100%;
`;

const RatingWrapper = styled.div`
    border: 1px solid #00bfff;
    color: #00bfff;
    border-radius: 10px;
    padding: 5px;
    margin-top: 5px;
    display: inline-block;
`;