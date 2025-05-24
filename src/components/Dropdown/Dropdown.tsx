import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export type DropdownOption = { label: string, value: string };

export type DropdownProps<T> = {
    options: DropdownOption[],
    placeholder: string,
    onChange: (value: T) => void
}

export const Dropdown = <T,>({ options, placeholder, onChange }: DropdownProps<T>) => {
    const [selectedValue, setSelectedValue] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const itemRef = useRef<HTMLDivElement>(null);

    const handleOutsideClick = (e: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target as HTMLElement)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        if (isOpen && itemRef.current) {
            const activeItem = itemRef.current.querySelector(".active");
            itemRef.current.scrollTop = (activeItem as HTMLElement)?.offsetTop - 72;
        }
    }, [isOpen]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedValue(value);
        onChange(value as T);
    };

    return (
        <DropdownWrapper ref={dropdownRef}>
            <Select value={selectedValue} onChange={handleChange}>
                <option value="" disabled>
                    {placeholder}
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Select>
        </DropdownWrapper>
    );
};


const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 10px 0;
`;

const Select = styled.select`
    height:38px;
    width:100%;
    border-radius:4px; 
    border: 1px solid #ccc;
    padding:0 10px;
`
