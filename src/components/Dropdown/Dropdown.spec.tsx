import { render, screen, fireEvent } from "@testing-library/react";
import { Dropdown, DropdownOption } from "./Dropdown";

describe("Dropdown Component", () => {
    const options: DropdownOption[] = [
        { label: "Option 1", value: "1" },
        { label: "Option 2", value: "2" },
        { label: "Option 3", value: "3" },
    ];

    const placeholder = "Select an option";
    const onChangeMock = jest.fn();

    it("renders the dropdown with placeholder", () => {
        render(<Dropdown options={options} placeholder={placeholder} onChange={onChangeMock} />);
        expect(screen.getByText(placeholder)).toBeInTheDocument();
    });

    it("renders all options", () => {
        render(<Dropdown options={options} placeholder={placeholder} onChange={onChangeMock} />);
        fireEvent.click(screen.getByText(placeholder));
        options.forEach((option) => {
            expect(screen.getByText(option.label)).toBeInTheDocument();
        });
    });

    it("calls onChange when an option is selected", () => {
        render(<Dropdown options={options} placeholder={placeholder} onChange={onChangeMock} />);
        const selectElement = screen.getByRole("combobox");
        fireEvent.change(selectElement, { target: { value: options[1].value } });
        expect(onChangeMock).toHaveBeenCalledWith(options[1].value);
    });

    it("does not call onChange when no option is selected", () => {
        render(<Dropdown options={options} placeholder={placeholder} onChange={onChangeMock} />);
        expect(onChangeMock).not.toHaveBeenCalled();
    });

    it("sets the correct value when an option is selected", () => {
        render(<Dropdown options={options} placeholder={placeholder} onChange={onChangeMock} />);
        const selectElement = screen.getByRole("combobox");
        fireEvent.change(selectElement, { target: { value: options[2].value } });
        expect(selectElement).toHaveValue(options[2].value);
    });
});