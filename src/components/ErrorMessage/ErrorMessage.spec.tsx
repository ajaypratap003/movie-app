import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage Component', () => {
    it('should render the error message when message is provided', () => {
        render(<ErrorMessage message="An error occurred" />);
        expect(screen.getByText('An error occurred')).toBeInTheDocument();
    });

    it('should apply correct styles to the error message', () => {
        render(<ErrorMessage message="Styled error" />);
        const errorElement = screen.getByText('Styled error');
        expect(errorElement).toHaveStyle('color: #ff4d4f');
        expect(errorElement).toHaveStyle('background-color: #fff1f0');
        expect(errorElement).toHaveStyle('border: 1px solid #ffa39e');
    });
});