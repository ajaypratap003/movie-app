import { FC, useState } from "react";
import styled from 'styled-components';

export type InputProps = {
    value: string,
    placeholder: string,
    onChange: (value: string) => void,
}

export const Input: FC<InputProps> = ({ value, placeholder, onChange }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <InputWrapper>
            <InputFieldIcon />
            <InputField
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                isFocused={isFocused}
            />
        </InputWrapper>
    );
}

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px;
    width: 88%;
    height: 25px;
    margin-top: 10px;
`;

const InputField = styled.input<{ isFocused: boolean }>`
    flex: 1;
    padding: 8px;   
    border: none;
    outline: none;
    border-color: ${props => props.isFocused ? 'blue' : 'gray'};
`;

const InputFieldIcon = styled.i`
    fa fa-search fa-lg;
`;