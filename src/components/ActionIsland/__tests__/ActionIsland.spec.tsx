import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ActionIsland, Props } from '../ActionIsland';

const mockOnClose = jest.fn();

const defaultProps: Props = {
    actionButtons: [
        { label: 'Action 1', onClick: jest.fn() },
        { label: 'Action 2', onClick: jest.fn() },
        { label: 'Action 3', onClick: jest.fn() },
        { label: 'Overflow Action', onClick: jest.fn() },
    ],
    isShown: true,
    onClose: mockOnClose,
    size: 'Large',
    label: 'Test Label',
    moreButtonLabel: 'More',
    closeButtonLabel: 'Close button',
    closeButtonTooltip: 'Close Tooltip',
};

describe('ActionIsland', () => {
    it('renders correctly with all props', () => {
        const { container } = render(<ActionIsland {...defaultProps} />);
        expect(screen.getByText('Test Label')).toBeInTheDocument();
        expect(screen.getByText('Action 1')).toBeInTheDocument();
        expect(screen.getByText('More')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('handles close button click correctly', async () => {
        render(<ActionIsland {...defaultProps} />);
        const user = userEvent.setup();
        const closeButton = screen.getByRole('button', { name: /close/i });
        await user.click(closeButton);
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('renders visible and overflow buttons correctly', () => {
        const { container } = render(<ActionIsland {...defaultProps} />);
        expect(screen.getByText('Action 1')).toBeInTheDocument();
        expect(screen.getByText('More')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('does not render when `isShown` is false', () => {
        const { container } = render(<ActionIsland {...defaultProps} isShown={false} />);
        expect(screen.queryByText('Test Label')).not.toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
