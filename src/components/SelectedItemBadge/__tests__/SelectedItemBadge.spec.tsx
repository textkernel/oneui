import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { SelectedItemBadge } from '../SelectedItemBadge';
import { SelectedItemBadgeProps } from '..';

const mockOnPriorityItemChange = jest.fn();
const mockOnDelete = jest.fn();

const defaultProps: SelectedItemBadgeProps<string, string> = {
    label: 'London',
    priority: {
        selectedItem: { priority: 'mandatory', label: 'Mandatory', value: 'required' },
        list: [
            { priority: 'mandatory', label: 'Mandatory', value: 'required' },
            { priority: 'important', label: 'Important', value: 'strongly_favored' },
            { priority: 'optional', label: 'Optional', value: 'favored' },
            { priority: 'exclude', label: 'Exclude', value: 'banned' },
        ],
        buttonAriaLabel: 'priority button',
        onChange: mockOnPriorityItemChange,
    },
    deleteButtonLabel: 'delete button',
    onDelete: mockOnDelete,
};

const renderSelectedItemBadge = (props = {}) =>
    render(<SelectedItemBadge {...defaultProps} {...props} />);

describe('SelectedItemBadge', () => {
    describe('Priority button', () => {
        it('renders correctly with all props provided', () => {
            const view = renderSelectedItemBadge();
            expect(view.container).toMatchSnapshot();
        });

        it('should handle priority change correctly', async () => {
            const view = renderSelectedItemBadge();
            const user = userEvent.setup();
            const priorityButton = screen.getByLabelText('priority button');
            await user.click(priorityButton);
            expect(view.container).toMatchSnapshot();
            await user.click(screen.getByText('Important'));
            expect(mockOnPriorityItemChange).toHaveBeenCalledTimes(1);
            expect(mockOnPriorityItemChange).toHaveBeenCalledWith({
                priority: 'important',
                label: 'Important',
                value: 'strongly_favored',
            });
        });

        it('does not render the priority button when priority is not provided', () => {
            const { queryByLabelText } = renderSelectedItemBadge({
                priority: undefined,
            });
            expect(queryByLabelText('priority button')).not.toBeInTheDocument();
        });

        it('does not render the priority button when priority list is not provided', () => {
            const { queryByLabelText } = renderSelectedItemBadge({
                priority: { list: undefined },
            });
            expect(queryByLabelText('priority button')).not.toBeInTheDocument();
        });

        it('does not render the priority button when priority list is empty', () => {
            const { queryByLabelText } = renderSelectedItemBadge({
                priority: { list: [] },
            });
            expect(queryByLabelText('priority button')).not.toBeInTheDocument();
        });
    });

    describe('Option button', () => {
        it.skip('renders children list headline when provided', async () => {});

        it.skip('should handle change correctly', async () => {});

        it.skip('does not render the option button but displays plain text with passed children if option is not provided', () => {});

        it.skip('does not render the option button but displays plain text with passed children if option list is not provided', () => {});

        it.skip('does not render the option button but displays plain text with passed children if option list is empty', () => {});
    });

    describe('Delete button', () => {
        it('should not render the delete button if onDelete is not provided', () => {
            const { queryByLabelText } = renderSelectedItemBadge({ onDelete: undefined });
            expect(queryByLabelText('delete button')).not.toBeInTheDocument();
        });

        it('should handle the delete button functionality correctly', async () => {
            const { getByLabelText } = renderSelectedItemBadge();
            const user = userEvent.setup();
            const deleteButton = getByLabelText('delete button');
            await user.click(deleteButton);
            expect(mockOnDelete).toHaveBeenCalled();
        });
    });

    it('renders all the buttons disabled when provided from props', () => {
        const { getByLabelText } = renderSelectedItemBadge({
            isDisabled: true,
        });
        expect(getByLabelText('priority button')).toBeDisabled();
        expect(getByLabelText('delete button')).toBeDisabled();
    });

    it('maintains state correctly after multiple interactions', async () => {
        const { getByText } = renderSelectedItemBadge();
        const user = userEvent.setup();
        const priorityButton = screen.getByLabelText('priority button');
        await user.click(priorityButton); // Open
        await user.click(priorityButton); // Close
        await user.click(priorityButton); // Re-open
        defaultProps?.priority?.list?.forEach(({ label }) => {
            expect(screen.getByText(label)).toBeInTheDocument();
        });
        await user.click(getByText('Optional'));
        expect(defaultProps?.priority?.onChange).toHaveBeenCalledTimes(1);
        expect(defaultProps?.priority?.onChange).toHaveBeenCalledWith({
            label: 'Optional',
            priority: 'optional',
            value: 'favored',
        });
    });
});
