import {FC} from 'react';
import styled from 'styled-components';

const Skelton: FC<{ width?: string; height?: string }> = ({ width = '100%', height = '20px' }) => {
    return <SkeltonWrapper style={{ width, height }} />;
};

export default Skelton;

const SkeltonWrapper = styled.div`
    display: inline-block;
    width: 100%;
    height: 100%;
    background-color: #e0e0e0;
    border-radius: 4px;
    animation: shimmer 1.5s infinite linear;
    overflow: hidden;
    position: relative;

    @keyframes shimmer {
        0% {
            background-position: -100%;
        }
        100% {
            background-position: 100%;
        }
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            to right,
            rgba(224, 224, 224, 0) 0%,
            rgba(255, 255, 255, 0.5) 50%,
            rgba(224, 224, 224, 0) 100%
        );
        animation: shimmer 1.5s infinite linear;
    }
`;