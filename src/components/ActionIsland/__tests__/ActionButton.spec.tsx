import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ActionButton, ActionButtonProps } from '../ActionButton';

const mockClick = jest.fn();

const defaultButtonProps: ActionButtonProps = {
    label: 'Test Button',
    onClick: mockClick,
};

describe('ActionButton', () => {
    it('renders correctly with label', () => {
        const { container } = render(<ActionButton {...defaultButtonProps} />);
        expect(screen.getByText('Test Button')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('handles click event correctly', async () => {
        render(<ActionButton {...defaultButtonProps} />);
        await userEvent.click(screen.getByText('Test Button'));
        expect(mockClick).toHaveBeenCalled();
    });

    it('renders dropdown items correctly when provided', async () => {
        const dropdownItems = [
            { label: 'Option 1', onClick: jest.fn() },
            { label: 'Option 2', onClick: jest.fn() },
        ];
        const { container } = render(
            <ActionButton {...defaultButtonProps} dropdownItems={dropdownItems} />
        );
        expect(screen.getByText('Test Button')).toBeInTheDocument();
        await userEvent.click(screen.getByText('Test Button'));
        expect(await screen.findByText('Option 1')).toBeInTheDocument();
        expect(await screen.findByText('Option 2')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('does not open dropdown when no items are provided', () => {
        const { container } = render(
            <ActionButton {...defaultButtonProps} tooltipContent="Tooltip Content" />
        );
        const button = screen.getByText('Test Button');
        userEvent.click(button);
        expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('renders tooltip correctly', async () => {
        render(<ActionButton {...defaultButtonProps} tooltipContent="Tooltip Content" />);
        await userEvent.hover(screen.getByText('Test Button'));
        expect(screen.getByText('Tooltip Content')).toBeInTheDocument();
    });
});
