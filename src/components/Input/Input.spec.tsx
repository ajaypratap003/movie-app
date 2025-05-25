import { render, screen, fireEvent } from "@testing-library/react";
import { Input, InputProps } from "./Input";

describe("Input Component", () => {
    const defaultProps: InputProps = {
        placeholder: "Enter text",
        onChange: jest.fn(),
    };

    it("should render the input with placeholder", () => {
        render(<Input {...defaultProps} />);
        const inputElement = screen.getByPlaceholderText(defaultProps.placeholder);
        expect(inputElement).toBeInTheDocument();
    });

    it("should call onChange when input value changes", () => {
        const onChangeMock = jest.fn();
        render(<Input {...defaultProps} onChange={onChangeMock} />);
        const inputElement = screen.getByPlaceholderText(defaultProps.placeholder);
        fireEvent.change(inputElement, { target: { value: "test" } });
        expect(onChangeMock).toHaveBeenCalledWith("test");
    });

    it("should update focus state when input is blurred", () => {
        render(<Input {...defaultProps} />);
        const inputElement = screen.getByPlaceholderText(defaultProps.placeholder);
        fireEvent.focus(inputElement);
        fireEvent.blur(inputElement);
        expect(inputElement).not.toHaveFocus();
    });

    it("should apply correct border color when focused", () => {
        render(<Input {...defaultProps} />);
        const inputElement = screen.getByPlaceholderText(defaultProps.placeholder);
        fireEvent.focus(inputElement);
        expect(inputElement).toHaveStyle("border-color: blue");
        fireEvent.blur(inputElement);
        expect(inputElement).toHaveStyle("border-color: gray");
    });
});