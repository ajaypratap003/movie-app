import React from 'react';
import styled from 'styled-components';

interface DropdownProps<T> {
    label?: string;
    options: T[];
    value: T;
    onChange: (value: T) => void;
}

function Dropdown<T extends string | number>({ label, options, value, onChange }: DropdownProps<T>) {
    return (
        <DropdownContainer>
            {label && <Label>{label}</Label>}
            <Select value={value} onChange={(e) => onChange(e.target.value as T)}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </Select>
        </DropdownContainer>
    );
}

export default Dropdown;


const DropdownContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px 0;
`;

const Label = styled.label`
    margin-bottom: 5px;
    font-weight: bold;
`;

const Select = styled.select`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;