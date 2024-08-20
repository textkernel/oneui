import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { SelectBadge } from '../SelectBadge';
import { SelectBadgeProps } from '..';

const mockOnChange = jest.fn();
const mockOnPriorityChange = jest.fn();
const mockOnDelete = jest.fn();

const defaultProps: SelectBadgeProps<string, string> = {
    children: 'Test Child',
    priorityItems: [
        { priority: 'mandatory', label: 'Mandatory', value: 'required' },
        { priority: 'important', label: 'Important', value: 'strongly_favored' },
        { priority: 'optional', label: 'Optional', value: 'favored' },
        { priority: 'exclude', label: 'Exclude', value: 'banned' },
    ],
    priorityItem: { priority: 'mandatory', label: 'Mandatory', value: 'required' },
    option: '15',
    optionList: ['5', '15', '25'],
    priorityButtonLabel: 'priority button',
    optionButtonLabel: 'option button',
    deleteButtonLabel: 'delete button',
    optionToLabel: (option) => `Label for ${option}`,
    optionToKey: (option) => `key-${option}`,
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

        it('should handle priority change correctly', async () => {
            const view = renderSelectBadge();

            const user = userEvent.setup();
            const priorityButton = screen.getByLabelText('priority button');
            await user.click(priorityButton);

            expect(view.container).toMatchSnapshot();

            await user.click(screen.getByText('Important'));

            expect(mockOnPriorityChange).toHaveBeenCalledTimes(1);
            expect(mockOnPriorityChange).toHaveBeenCalledWith({
                priority: 'important',
                label: 'Important',
                value: 'strongly_favored',
            });
        });

        it('does not render priority button when priorityItems are not provided', () => {
            const { queryByLabelText } = renderSelectBadge({
                priorityItems: undefined,
            });

            expect(queryByLabelText('priority button')).not.toBeInTheDocument();
        });

        it('does not render priority button when priorityItems array is empty', () => {
            const { queryByLabelText } = renderSelectBadge({
                priorityItems: [],
            });

            expect(queryByLabelText('priority button')).not.toBeInTheDocument();
        });

        it('does not render the priority button when onPriorityChange is not provided', () => {
            const { queryByLabelText } = renderSelectBadge({
                onPriorityChange: undefined,
            });

            expect(queryByLabelText('priority button')).not.toBeInTheDocument();
        });

        it('does not render the priority button when priority item is not provided', () => {
            const { queryByLabelText } = renderSelectBadge({
                priorityItem: undefined,
            });

            expect(queryByLabelText('priority button')).not.toBeInTheDocument();
        });

        it('does not render the priority button when neither priorityItems, nor priorityItems, nor onPriorityChange are provided', () => {
            const { queryByLabelText } = renderSelectBadge({
                priorityItem: undefined,
                priorityLabels: undefined,
                onPriorityChange: undefined,
            });

            expect(queryByLabelText('priority button')).not.toBeInTheDocument();
        });
    });

    describe('Option button', () => {
        it('renders option list headline when provided', async () => {
            const { getByLabelText, getByText } = renderSelectBadge({
                optionListHeader: 'Select an Option',
            });

            const user = userEvent.setup();
            const optionButton = getByLabelText('Label for 15 option button');
            await user.click(optionButton);

            expect(getByText('SELECT AN OPTION')).toBeInTheDocument();
        });

        it('should handle option change correctly', async () => {
            const view = renderSelectBadge();

            const user = userEvent.setup();
            const optionButton = screen.getByLabelText('Label for 15 option button');
            await user.click(optionButton);

            expect(view.container).toMatchSnapshot();

            await user.click(screen.getByText('Label for 25'));

            expect(mockOnChange).toHaveBeenCalledTimes(1);
            expect(mockOnChange).toHaveBeenCalledWith('25');
        });

        it('renders the correct labels using optionToLabel', async () => {
            const { getAllByText, getByLabelText } = renderSelectBadge();

            const user = userEvent.setup();
            const optionButton = getByLabelText('Label for 15 option button');
            await user.click(optionButton);

            defaultProps?.optionList?.forEach((opt) =>
                expect(getAllByText(`Label for ${opt}`)[0]).toBeInTheDocument()
            );
        });

        it('does not render option button but displays plain text with passed children if optionList is not provided', () => {
            const { getByText, queryByText } = renderSelectBadge({
                optionList: undefined,
            });

            expect(queryByText('option button')).not.toBeInTheDocument();
            expect(getByText('Test Child')).toBeInTheDocument();
        });

        it('does not render option button but displays plain text with passed children if optionList is an empty', () => {
            const { getByText, queryByText } = renderSelectBadge({
                optionList: [],
            });

            expect(queryByText('option button')).not.toBeInTheDocument();
            expect(getByText('Test Child')).toBeInTheDocument();
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
        expect(getByLabelText('Label for 15 option button')).toBeDisabled();
        expect(getByLabelText('delete button')).toBeDisabled();
    });

    it('maintains state correctly after multiple interactions', async () => {
        const { getByText } = renderSelectBadge();

        const user = userEvent.setup();
        const priorityButton = screen.getByLabelText('priority button');

        await user.click(priorityButton); // Open
        await user.click(priorityButton); // Close
        await user.click(priorityButton); // Re-open

        defaultProps?.priorityItems?.forEach(({ label }) => {
            expect(screen.getByText(label)).toBeInTheDocument();
        });

        await user.click(getByText('Optional'));

        expect(defaultProps.onPriorityChange).toHaveBeenCalledTimes(1);
        expect(defaultProps.onPriorityChange).toHaveBeenCalledWith({
            label: 'Optional',
            priority: 'optional',
            value: 'favored',
        });
    });
});
