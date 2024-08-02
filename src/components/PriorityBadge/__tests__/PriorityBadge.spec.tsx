import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { Priority, PriorityBadge } from '../PriorityBadge';

const mockOnChange = jest.fn();
const mockOnPriorityChange = jest.fn();
const mockOnClose = jest.fn();

const defaultProps = {
    children: 'Test Child',
    priorityLabels: {
        mandatory: 'Mandatory',
        important: 'Important',
        optional: 'Optional',
        exclude: 'Exclude',
    },
    priority: 'mandatory' as Priority,
    option: { value: 'opt1', label: 'Option 1' },
    optionList: [
        { value: 'opt1', label: 'Option 1' },
        { value: 'opt2', label: 'Option 2' },
    ],
    onChange: mockOnChange,
    onPriorityChange: mockOnPriorityChange,
    onClose: mockOnClose,
};

const renderPriorityBadge = (props = {}) => render(<PriorityBadge {...defaultProps} {...props} />);

describe('PriorityBadge', () => {
    describe('Priority button', () => {
        it('renders correctly with all props provided', () => {
            const view = renderPriorityBadge();
            expect(view.container).toMatchSnapshot();
        });

        it('renders only the priorities for which labels are provided', async () => {
            const priorityLabels = {
                mandatory: 'Mandatory',
                important: 'Important',
            };
            const { getByLabelText, getByText, queryByText } = renderPriorityBadge({
                priorityLabels,
            });

            const user = userEvent.setup();
            const priorityButton = getByLabelText('mandatory priority button');
            await user.click(priorityButton);

            expect(getByText('Mandatory')).toBeInTheDocument();
            expect(getByText('Important')).toBeInTheDocument();
            expect(queryByText('Optional')).not.toBeInTheDocument();
            expect(queryByText('Exclude')).not.toBeInTheDocument();
        });

        it('renders no priority buttons when priorityLabels is empty', () => {
            const { queryByLabelText } = renderPriorityBadge({ priorityLabels: {} });

            expect(queryByLabelText('priority button')).not.toBeInTheDocument();
        });

        it('should handle priority change correctly', async () => {
            const view = renderPriorityBadge();

            const user = userEvent.setup();
            const priorityButton = screen.getByLabelText('mandatory priority button');
            await user.click(priorityButton);

            expect(view.container).toMatchSnapshot();

            await user.click(screen.getByText('Important'));

            expect(mockOnPriorityChange).toHaveBeenCalledTimes(1);
            expect(mockOnPriorityChange).toHaveBeenCalledWith('important');
        });

        it('does not render the priority button when priorityLabels are not provided', () => {
            const { queryByLabelText } = renderPriorityBadge({
                priorityLabels: undefined,
                onPriorityChange: jest.fn(),
            });

            expect(queryByLabelText('mandatory priority button')).not.toBeInTheDocument();
        });

        it('does not render the priority button when onPriorityChange is not provided', () => {
            const { queryByText } = renderPriorityBadge({
                priorityLabels: { mandatory: 'Mandatory' },
                onPriorityChange: undefined,
            });

            expect(queryByText('mandatory priority button')).not.toBeInTheDocument();
        });

        it('does not render the priority button when neither priorityLabels nor onPriorityChange are provided', () => {
            const { queryByText } = renderPriorityBadge({
                priorityLabels: undefined,
                onPriorityChange: undefined,
            });

            expect(queryByText('priority button')).not.toBeInTheDocument();
        });

        it('renders priority button as disabled when provided from props', () => {
            renderPriorityBadge({
                isPriorityButtonDisabled: true,
            });
            const priorityButton = screen.getByLabelText('mandatory priority button');
            expect(priorityButton).toBeDisabled();
        });
    });
    describe('Option button', () => {
        it('renders option list headline when provided', async () => {
            const { getByText } = renderPriorityBadge({ optionListHeader: 'Select an Option' });

            const user = userEvent.setup();
            const optionButton = screen.getByText('Option 1');
            await user.click(optionButton);

            expect(getByText('SELECT AN OPTION')).toBeInTheDocument();
        });

        it('should handle option change correctly', async () => {
            const view = renderPriorityBadge();

            const user = userEvent.setup();
            const optionButton = screen.getByText('Option 1');
            await user.click(optionButton);

            expect(view.container).toMatchSnapshot();

            await user.click(screen.getByText('Option 2'));

            expect(mockOnChange).toHaveBeenCalledTimes(1);
            expect(mockOnChange).toHaveBeenCalledWith({ value: 'opt2', label: 'Option 2' });
        });

        it('does not render option button but displays plain text with passed children if optionList is not provided.', () => {
            const { getByText, queryByText } = renderPriorityBadge({
                optionList: undefined,
            });

            expect(queryByText('option button')).not.toBeInTheDocument();
            expect(getByText(defaultProps.children)).toBeInTheDocument();
        });

        it('renders option button as disabled when provided from props', () => {
            renderPriorityBadge({
                isOptionButtonDisabled: true,
            });
            const optionButton = screen.getByLabelText('Option 1 option button');
            expect(optionButton).toBeDisabled();
        });
    });

    describe('Close button', () => {
        it('should not render close button if onClose is not provided', () => {
            const { queryByLabelText } = renderPriorityBadge({ onClose: undefined });
            expect(queryByLabelText('close button')).not.toBeInTheDocument();
        });

        it('should handle close button functionality', async () => {
            const { getByLabelText } = renderPriorityBadge();

            const user = userEvent.setup();
            const closeButton = getByLabelText('close button');
            await user.click(closeButton);

            expect(mockOnClose).toHaveBeenCalled();
        });

        it('renders close button as disabled when provided from props', () => {
            const { getByLabelText } = renderPriorityBadge({
                isCloseButtonDisabled: true,
            });

            expect(getByLabelText('close button')).toBeDisabled();
        });
    });

    it('maintains state correctly after multiple interactions', async () => {
        const { getByText } = renderPriorityBadge();

        const user = userEvent.setup();
        const priorityButton = screen.getByLabelText('mandatory priority button');

        await user.click(priorityButton); // Open
        await user.click(priorityButton); // Close
        await user.click(priorityButton); // Re-open

        Object.values(defaultProps.priorityLabels).forEach((label) => {
            expect(getByText(label)).toBeInTheDocument();
        });

        await user.click(getByText('Optional'));

        expect(defaultProps.onPriorityChange).toHaveBeenCalledTimes(1);
        expect(defaultProps.onPriorityChange).toHaveBeenCalledWith('optional');
    });
});
