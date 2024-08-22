import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { SelectBadge } from '../SelectBadge';
import { SelectBadgeProps } from '..';

const mockonOptionItemChange = jest.fn();
const mockonPriorityItemChange = jest.fn();
const mockOnDelete = jest.fn();

const defaultProps: SelectBadgeProps<string, string> = {
    children: 'Test Child',
    priority: {
        priorityItem: { priority: 'mandatory', label: 'Mandatory', value: 'required' },
        priorityItemList: [
            { priority: 'mandatory', label: 'Mandatory', value: 'required' },
            { priority: 'important', label: 'Important', value: 'strongly_favored' },
            { priority: 'optional', label: 'Optional', value: 'favored' },
            { priority: 'exclude', label: 'Exclude', value: 'banned' },
        ],
        priorityButtonLabel: 'priority button',
        onPriorityItemChange: mockonPriorityItemChange,
    },
    option: {
        optionItem: '15',
        optionItemList: ['5', '15', '25'],
        optionToLabel: (option) => `Label for ${option}`,
        optionToKey: (option) => `key-${option}`,
        onOptionItemChange: mockonOptionItemChange,
        optionButtonLabel: 'option button',
    },
    deleteButtonLabel: 'delete button',
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

            expect(mockonPriorityItemChange).toHaveBeenCalledTimes(1);
            expect(mockonPriorityItemChange).toHaveBeenCalledWith({
                priority: 'important',
                label: 'Important',
                value: 'strongly_favored',
            });
        });

        it('does not render the priority button when priority is not provided', () => {
            const { queryByLabelText } = renderSelectBadge({
                priority: undefined,
            });

            expect(queryByLabelText('priority button')).not.toBeInTheDocument();
        });

        it('does not render the priority button when priorityItemList are not provided', () => {
            const { queryByLabelText } = renderSelectBadge({
                priority: { priorityItemList: undefined },
            });

            expect(queryByLabelText('priority button')).not.toBeInTheDocument();
        });

        it('does not render the priority button when priorityItemList array is empty', () => {
            const { queryByLabelText } = renderSelectBadge({
                priority: { priorityItemList: [] },
            });

            expect(queryByLabelText('priority button')).not.toBeInTheDocument();
        });
    });

    describe('Option button', () => {
        it('renders option list headline when provided', async () => {
            const { getByLabelText, getByText } = renderSelectBadge({
                option: { ...defaultProps.option, optionItemListHeader: 'Select an Option' },
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

            expect(mockonOptionItemChange).toHaveBeenCalledTimes(1);
            expect(mockonOptionItemChange).toHaveBeenCalledWith('25');
        });

        it('renders the correct labels using optionToLabel', async () => {
            const { getAllByText, getByLabelText } = renderSelectBadge();

            const user = userEvent.setup();
            const optionButton = getByLabelText('Label for 15 option button');
            await user.click(optionButton);

            defaultProps?.option?.optionItemList?.forEach((opt) =>
                expect(getAllByText(`Label for ${opt}`)[0]).toBeInTheDocument()
            );
        });

        it('does not render the option button but displays plain text with passed children if option is not provided', () => {
            const { getByText, queryByText } = renderSelectBadge({
                option: undefined,
            });

            expect(queryByText('option button')).not.toBeInTheDocument();
            expect(getByText('Test Child')).toBeInTheDocument();
        });

        it('does not render the option button but displays plain text with passed children if optionList is not provided', () => {
            const { getByText, queryByText } = renderSelectBadge({
                option: { optionItemList: undefined },
            });

            expect(queryByText('option button')).not.toBeInTheDocument();
            expect(getByText('Test Child')).toBeInTheDocument();
        });

        it('does not render the option button but displays plain text with passed children if optionList is an empty', () => {
            const { getByText, queryByText } = renderSelectBadge({
                option: { optionItemList: [] },
            });

            expect(queryByText('option button')).not.toBeInTheDocument();
            expect(getByText('Test Child')).toBeInTheDocument();
        });
    });

    describe('Delete button', () => {
        it('should not render the delete button if onDelete is not provided', () => {
            const { queryByLabelText } = renderSelectBadge({ onDelete: undefined });
            expect(queryByLabelText('delete button')).not.toBeInTheDocument();
        });

        it('should handle the delete button functionality correctly', async () => {
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

        defaultProps?.priority?.priorityItemList?.forEach(({ label }) => {
            expect(screen.getByText(label)).toBeInTheDocument();
        });

        await user.click(getByText('Optional'));

        expect(defaultProps?.priority?.onPriorityItemChange).toHaveBeenCalledTimes(1);
        expect(defaultProps?.priority?.onPriorityItemChange).toHaveBeenCalledWith({
            label: 'Optional',
            priority: 'optional',
            value: 'favored',
        });
    });
});
