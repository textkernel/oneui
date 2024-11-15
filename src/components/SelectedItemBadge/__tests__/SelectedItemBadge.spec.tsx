/** 
 * TODO:
// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import '@testing-library/jest-dom/extend-expect';
// import { SelectedItemBadge } from '../SelectedItemBadge';
// import { SelectedItemBadgeProps } from '..';
// import { ListItem } from '../../List';

// const mockOnPriorityItemChange = jest.fn();
// const mockOnDelete = jest.fn();

// const defaultProps: SelectedItemBadgeProps<string, string> = {
//     label: 'London',
//     priority: {
//         selectedItem: { priority: 'mandatory', label: 'Mandatory', value: 'required' },
//         list: [
//             { priority: 'mandatory', label: 'Mandatory', value: 'required' },
//             { priority: 'important', label: 'Important', value: 'strongly_favored' },
//             { priority: 'optional', label: 'Optional', value: 'favored' },
//             { priority: 'exclude', label: 'Exclude', value: 'banned' },
//         ],
//         buttonLabel: 'priority button',
//         onChange: mockOnPriorityItemChange,
//     },
//     buttonLabel: 'main button',
//     deleteButtonLabel: 'delete button',
//     onDelete: mockOnDelete,
// };

// const renderSelectedItemBadge = (props = {}) =>
//     render(<SelectedItemBadge {...defaultProps} {...props} />);
*/

describe('SelectedItemBadge', () => {
    it.todo('reimplement tests once component is fixed');
    //     describe('Priority button', () => {
    //         it('renders correctly with all props provided', () => {
    //             const view = renderSelectedItemBadge();
    //             expect(view.container).toMatchSnapshot();
    //         });

    //         it('should handle priority change correctly', async () => {
    //             const view = renderSelectedItemBadge();
    //             const user = userEvent.setup();
    //             const priorityButton = screen.getByLabelText('priority button');
    //             await user.click(priorityButton);
    //             expect(view.container).toMatchSnapshot();
    //             await user.click(screen.getByText('Important'));
    //             expect(mockOnPriorityItemChange).toHaveBeenCalledTimes(1);
    //             expect(mockOnPriorityItemChange).toHaveBeenCalledWith({
    //                 priority: 'important',
    //                 label: 'Important',
    //                 value: 'strongly_favored',
    //             });
    //         });

    //         it('does not render the priority button when priority is not provided', () => {
    //             const { queryByLabelText } = renderSelectedItemBadge({
    //                 priority: undefined,
    //             });
    //             expect(queryByLabelText('priority button')).not.toBeInTheDocument();
    //         });

    //         it('does not render the priority button when priority list is not provided', () => {
    //             const { queryByLabelText } = renderSelectedItemBadge({
    //                 priority: { list: undefined },
    //             });
    //             expect(queryByLabelText('priority button')).not.toBeInTheDocument();
    //         });

    //         it('does not render the priority button when priority list is empty', () => {
    //             const { queryByLabelText } = renderSelectedItemBadge({
    //                 priority: { list: [] },
    //             });
    //             expect(queryByLabelText('priority button')).not.toBeInTheDocument();
    //         });
    //     });
    //     describe('Main button', () => {
    //         it('renders children correctly', async () => {
    //             const user = userEvent.setup();
    //             const mockOnChange = jest.fn();

    //             const { getByText, getByLabelText } = renderSelectedItemBadge({
    //                 label: 'Option',
    //                 children: [
    //                     <ListItem key="option1" value="option1">
    //                         Option 1
    //                     </ListItem>,
    //                     <ListItem key="option2" value="option2">
    //                         Option 2
    //                     </ListItem>,
    //                 ],
    //                 onChange: mockOnChange,
    //             });

    //             expect(getByText('Option')).toBeInTheDocument();

    //             const mainButton = getByLabelText('main button');
    //             await user.click(mainButton);

    //             expect(getByText('Option 1')).toBeInTheDocument();
    //             expect(getByText('Option 2')).toBeInTheDocument();
    //         });

    //         it('should handle change correctly', async () => {
    //             const mockOnChange = jest.fn();
    //             const user = userEvent.setup();

    //             const { getByText, getByLabelText } = renderSelectedItemBadge({
    //                 label: 'Option',
    //                 children: [
    //                     <ListItem key="option1" value="option1">
    //                         Option 1
    //                     </ListItem>,
    //                     <ListItem key="option2" value="option2">
    //                         Option 2
    //                     </ListItem>,
    //                 ],
    //                 onChange: mockOnChange,
    //             });

    //             const mainButton = getByLabelText('main button');
    //             await user.click(mainButton);

    //             await user.click(getByText('Option 2'));

    //             expect(mockOnChange).toHaveBeenCalledTimes(1);
    //             expect(mockOnChange).toHaveBeenCalledWith('option2');
    //         });

    //         it('does not render the main button but displays plain text if children are not provided', () => {
    //             const { getByText, queryByRole } = renderSelectedItemBadge({
    //                 label: 'Plain Text Label',
    //                 children: undefined,
    //             });

    //             expect(getByText('Plain Text Label')).toBeInTheDocument();
    //             expect(queryByRole('button', { name: 'Plain Text Label' })).not.toBeInTheDocument();
    //         });
    //     });

    //     describe('Delete button', () => {
    //         it('should not render the delete button if onDelete is not provided', () => {
    //             const { queryByLabelText } = renderSelectedItemBadge({ onDelete: undefined });
    //             expect(queryByLabelText('delete button')).not.toBeInTheDocument();
    //         });

    //         it('should handle the delete button functionality correctly', async () => {
    //             const { getByLabelText } = renderSelectedItemBadge();
    //             const user = userEvent.setup();
    //             const deleteButton = getByLabelText('delete button');
    //             await user.click(deleteButton);
    //             expect(mockOnDelete).toHaveBeenCalled();
    //         });
    //     });

    //     it('renders all the buttons disabled when provided from props', () => {
    //         const { getByLabelText } = renderSelectedItemBadge({
    //             isDisabled: true,
    //         });
    //         expect(getByLabelText('priority button')).toBeDisabled();
    //         expect(getByLabelText('delete button')).toBeDisabled();
    //     });

    //     it('maintains state correctly after multiple interactions', async () => {
    //         const { getByText } = renderSelectedItemBadge();
    //         const user = userEvent.setup();
    //         const priorityButton = screen.getByLabelText('priority button');
    //         await user.click(priorityButton); // Open
    //         await user.click(priorityButton); // Close
    //         await user.click(priorityButton); // Re-open
    //         defaultProps?.priority?.list?.forEach(({ label }) => {
    //             expect(screen.getByText(label)).toBeInTheDocument();
    //         });
    //         await user.click(getByText('Optional'));
    //         expect(defaultProps?.priority?.onChange).toHaveBeenCalledTimes(1);
    //         expect(defaultProps?.priority?.onChange).toHaveBeenCalledWith({
    //             label: 'Optional',
    //             priority: 'optional',
    //             value: 'favored',
    //         });
    //     });
});
