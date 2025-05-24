import { useEffect, useRef, useState, FC } from "react";
import styled from "styled-components";
import { DownIcon, UpIcon } from "./Icons";

export type DropdownOption = { label: string, value: string };

export type DropdownProps<T> = {
    value: T,
    options: T[],
    placeholder: string,
    onChange: (value: T) => void
}

export const Dropdown = <T,>({ value, options, placeholder, onChange }: DropdownProps<T>) => {
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

    return (
        <DropdownWrapper ref={dropdownRef}>
            <DropdownBtn onClick={() => setIsOpen(!isOpen)}>
                {String(value) || placeholder}
                {!isOpen ? <DownIcon /> : <UpIcon />}
            </DropdownBtn>
            {isOpen && (
                <DropdownList ref={itemRef}>
                    {options.map((opt, index) => (
                        <DropdownItem
                            key={index}
                            onClick={() => {
                                onChange(opt);
                                setIsOpen(false);
                            }}
                            className={opt === value ? "active" : undefined}
                        >
                            {String(opt)}
                        </DropdownItem>
                    ))}
                </DropdownList>
            )}
        </DropdownWrapper>
    );
};


const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const DropdownBtn = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 150px;
  height: 40px;
  background-color: white;
  color: black;
  border: 1px solid gray;
  border-radius: 4px;
  font-size: 14px;
  padding: 0 14px;
  cursor: pointer;
  svg {
    width: 16px;
  }
`;

const DropdownList = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 4px 0;
  margin-top: 4px;
  border: 1px solid #eee;
  position: absolute;
  width: 100%;
  margin-top: 48px;
  max-height: 180px;
  overflow-y: auto;
`;

const DropdownItem = styled.button`
  min-height: 36px;
  background: #fff;
  border: none;
  color: #253858;
  text-align: left;
  cursor: pointer;
  padding: 0 14px;
  font-size: 14px;
  &.active,
  &:hover {
    background-color: #eee;
  }
`;
