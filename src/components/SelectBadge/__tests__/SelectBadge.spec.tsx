import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { Priority, SelectBadge } from '../SelectBadge';

const mockOnChange = jest.fn();
const mockOnPriorityChange = jest.fn();
const mockOnDelete = jest.fn();

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
    onDelete: mockOnDelete,
};

const renderSelectBadge = (props = {}) => render(<SelectBadge {...defaultProps} {...props} />);

describe('SelectBadge', () => {
    describe('Priority button', () => {
        it('renders correctly with all props provided', () => {
            const view = renderSelectBadge();
            expect(view.container).toMatchSnapshot();
        });

        it('renders only the priorities for which labels are provided', async () => {
            const priorityLabels = {
                mandatory: 'Mandatory',
                important: 'Important',
            };
            const { getByLabelText, getByText, queryByText } = renderSelectBadge({
                priorityLabels,
            });

            const user = userEvent.setup();
            const priorityButton = getByLabelText('priority button');
            await user.click(priorityButton);

            expect(getByText('Mandatory')).toBeInTheDocument();
            expect(getByText('Important')).toBeInTheDocument();
            expect(queryByText('Optional')).not.toBeInTheDocument();
            expect(queryByText('Exclude')).not.toBeInTheDocument();
        });

        it('renders no priority buttons when priorityLabels is empty', () => {
            const { queryByLabelText } = renderSelectBadge({ priorityLabels: {} });

            expect(queryByLabelText('priority button')).not.toBeInTheDocument();
        });

        it('should handle priority change correctly', async () => {
            const view = renderSelectBadge();

            const user = userEvent.setup();
            const priorityButton = screen.getByLabelText('priority button');
            await user.click(priorityButton);

            expect(view.container).toMatchSnapshot();

            await user.click(screen.getByText('Important'));

            expect(mockOnPriorityChange).toHaveBeenCalledTimes(1);
            expect(mockOnPriorityChange).toHaveBeenCalledWith('important');
        });

        it('does not render the priority button when priorityLabels are not provided', () => {
            const { queryByLabelText } = renderSelectBadge({
                priorityLabels: undefined,
                onPriorityChange: jest.fn(),
            });

            expect(queryByLabelText('priority button')).not.toBeInTheDocument();
        });

        it('does not render the priority button when onPriorityChange is not provided', () => {
            const { queryByText } = renderSelectBadge({
                priorityLabels: { mandatory: 'Mandatory' },
                onPriorityChange: undefined,
            });

            expect(queryByText('priority button')).not.toBeInTheDocument();
        });

        it('does not render the priority button when neither priorityLabels nor onPriorityChange are provided', () => {
            const { queryByText } = renderSelectBadge({
                priorityLabels: undefined,
                onPriorityChange: undefined,
            });

            expect(queryByText('priority button')).not.toBeInTheDocument();
        });
    });

    describe('Option button', () => {
        it('renders option list headline when provided', async () => {
            const { getByText } = renderSelectBadge({ optionListHeader: 'Select an Option' });

            const user = userEvent.setup();
            const optionButton = screen.getByText('Option 1');
            await user.click(optionButton);

            expect(getByText('SELECT AN OPTION')).toBeInTheDocument();
        });

        it('should handle option change correctly', async () => {
            const view = renderSelectBadge();

            const user = userEvent.setup();
            const optionButton = screen.getByText('Option 1');
            await user.click(optionButton);

            expect(view.container).toMatchSnapshot();

            await user.click(screen.getByText('Option 2'));

            expect(mockOnChange).toHaveBeenCalledTimes(1);
            expect(mockOnChange).toHaveBeenCalledWith({ value: 'opt2', label: 'Option 2' });
        });

        it('does not render option button but displays plain text with passed children if optionList is not provided.', () => {
            const { getByText, queryByText } = renderSelectBadge({
                optionList: undefined,
            });

            expect(queryByText('option button')).not.toBeInTheDocument();
            expect(getByText(defaultProps.children)).toBeInTheDocument();
        });
    });

    describe('Delete button', () => {
        it('should not render delete button if onDelete is not provided', () => {
            const { queryByLabelText } = renderSelectBadge({ onDelete: undefined });
            expect(queryByLabelText('delete button')).not.toBeInTheDocument();
        });

        it('should handle delete button functionality', async () => {
            const { getByLabelText } = renderSelectBadge();

            const user = userEvent.setup();
            const deleteButton = getByLabelText('delete button');
            await user.click(deleteButton);

            expect(mockOnDelete).toHaveBeenCalled();
        });
    });

    it('renders all the buttons disabled when provided from props', () => {
        const { getByLabelText } = renderSelectBadge({
            isDisabled: true,
        });

        expect(getByLabelText('priority button')).toBeDisabled();
        expect(getByLabelText('Option 1 option button')).toBeDisabled();
        expect(getByLabelText('delete button')).toBeDisabled();
    });

    it('maintains state correctly after multiple interactions', async () => {
        const { getByText } = renderSelectBadge();

        const user = userEvent.setup();
        const priorityButton = screen.getByLabelText('priority button');

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
