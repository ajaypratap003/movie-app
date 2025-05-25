import { FC } from 'react';
import styled from 'styled-components';

export type ErrorMessageProps = {
    message: string | null;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
    return <ErrorContainer>{message}</ErrorContainer>;
};

export default ErrorMessage;

const ErrorContainer = styled.div`
    color: #ff4d4f;
    background-color: #fff1f0;
    border: 1px solid #ffa39e;
    padding: 5px;
    border-radius: 4px;
    font-size: 14px;
`;