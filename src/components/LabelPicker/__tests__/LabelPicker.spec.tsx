import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { LabelPicker } from '../LabelPicker';
import { Button } from '../../Buttons';
import { useDocumentEvent } from '../../../utils/testUtils';

const labelsMock = [
    {
        name: 'First label',
        isSelected: false,
    },
    {
        name: 'Second label',
        isSelected: true,
        count: 12,
    },
    {
        name: 'Third label',
        isSelected: false,
        count: 0,
    },
    {
        name: 'Fourth label',
        isSelected: false,
        count: 0,
        id: 'random',
    },
];

const defaultProps = {
    labels: [],
    inputPlaceholder: '',
    onAdd: () => {},
    onChange: () => {},
};

let view;

beforeEach(() => {
    view = render(
        <LabelPicker {...defaultProps}>
            <Button>Click me</Button>
        </LabelPicker>
    );
});

const rerenderView = (props) => {
    view.rerender(
        <LabelPicker {...defaultProps} {...props}>
            <Button>Click me</Button>
        </LabelPicker>
    );
};

describe('<LabelPicker> that renders a dropdown type component to apply/remove/add labels', () => {
    describe('snapshot tests', () => {
        it('should render correctly in closed state', () => {
            expect(view.container).toMatchSnapshot();
        });

        it('should render correctly with dialog open', () => {
            expect(view.container).toMatchSnapshot();
        });
    });

    describe('trigger button', () => {
        it('should render trigger button correctly', () => {
            expect(screen.getAllByRole('button', { name: 'Click me' })).toHaveLength(1);
        });

        it('should call original onClick handler from trigger button (passed with the prop)', async () => {
            const user = userEvent.setup();
            const onClick = jest.fn();
            view.rerender(
                <LabelPicker {...defaultProps}>
                    <Button onClick={onClick}>Click me</Button>
                </LabelPicker>
            );

            await user.click(screen.getAllByRole('button', { name: 'Click me' })[0]);

            expect(onClick).toHaveBeenCalledTimes(1);
        });
    });

    describe('toggling dialog visibility', () => {
        it('should toggle dialog when trigger button is clicked', async () => {
            const user = userEvent.setup();
            expect(view.container).toMatchSnapshot();
            expect(screen.queryAllByRole('dialog')).toHaveLength(0);

            // open dialog
            await user.click(screen.getByRole('button', { name: 'Click me' }));

            expect(screen.getAllByRole('dialog').length).toBeGreaterThan(0);

            // close dialog
            await user.click(screen.getByRole('button', { name: 'Click me' }));

            expect(screen.queryAllByRole('dialog')).toHaveLength(0);
        });

        it('should close dialog on outer click', async () => {
            const user = userEvent.setup();
            const clickDocument = useDocumentEvent('click');

            expect(screen.queryAllByRole('dialog')).toHaveLength(0);

            // open dialog
            await user.click(screen.getByRole('button', { name: 'Click me' }));

            expect(screen.getAllByRole('dialog').length).toBeGreaterThan(0);

            // click outside of component
            await waitFor(() => {
                clickDocument('click');
            });

            expect(screen.queryAllByRole('dialog')).toHaveLength(0);
        });

        it('should not close dialog when it was clicked (e.g. a checkbox within the dialog etc.)', async () => {
            const user = userEvent.setup();
            expect(screen.queryAllByRole('dialog')).toHaveLength(0);

            // open dialog
            await user.click(screen.getByRole('button', { name: 'Click me' }));

            expect(screen.getAllByRole('dialog').length).toBeGreaterThan(0);

            // click in the dialog
            await user.click(screen.getByRole('textbox'));

            expect(screen.getAllByRole('dialog').length).toBeGreaterThan(0);
        });
    });

    describe('labels rendering', () => {
        it('should render dialog with empty labels list', async () => {
            const user = userEvent.setup();
            await user.click(screen.getByRole('button', { name: 'Click me' }));

            expect(screen.queryAllByRole('checkbox')).toHaveLength(0);
        });

        it('should render dialog with labels', async () => {
            const user = userEvent.setup();
            rerenderView({
                labels: labelsMock,
            });
            await user.click(screen.getByRole('button', { name: 'Click me' }));

            expect(screen.getAllByRole('checkbox')).toHaveLength(labelsMock.length);
        });

        it('should render count when it is passed', async () => {
            const user = userEvent.setup();
            rerenderView({
                labels: labelsMock,
            });
            await user.click(screen.getByRole('button', { name: 'Click me' }));

            expect(screen.getAllByRole('checkbox')[1]).toHaveAttribute('id', 'Second label');
        });

        it('should not render 0 count', async () => {
            const user = userEvent.setup();
            rerenderView({
                labels: labelsMock,
            });
            await user.click(screen.getByRole('button', { name: 'Click me' }));

            expect(screen.getAllByRole('checkbox')[2]).toHaveAttribute('id', 'Third label');
        });

        it('should set label selection state according to props passed', async () => {
            const user = userEvent.setup();
            rerenderView({
                labels: labelsMock,
            });
            await user.click(screen.getByRole('button', { name: 'Click me' }));
            const checkboxes = screen.getAllByRole('checkbox');

            expect(checkboxes[0]).not.toHaveAttribute('checked');
            expect(checkboxes[1]).toHaveAttribute('checked');
            expect(checkboxes[2]).not.toHaveAttribute('checked');
        });
    });

    describe('Input rendering', () => {
        it('should have add button enabled only when there is input text in the field', async () => {
            const user = userEvent.setup();
            rerenderView({
                labels: labelsMock,
            });
            await user.click(screen.getByRole('button', { name: 'Click me' }));

            expect(screen.getAllByRole('button')[1]).toHaveAttribute('disabled');

            await user.type(screen.getByRole('textbox'), 'test');

            expect(screen.getAllByRole('button')[1]).not.toHaveAttribute('disabled');
        });

        it('should clear the input value after add button was clicked', async () => {
            const user = userEvent.setup();
            const mockOnAdd = jest.fn();
            rerenderView({
                onAdd: mockOnAdd,
                labels: labelsMock,
            });
            // open dialog
            await user.click(screen.getByRole('button', { name: 'Click me' }));
            // type in input field
            await user.type(screen.getByRole('textbox'), 'test');

            expect(screen.getByRole('textbox')).toHaveAttribute('value', 'test');
            // click add
            await user.click(screen.getAllByRole('button')[1]);

            expect(screen.getByRole('textbox')).toHaveAttribute('value', '');
        });
    });

    describe('callbacks', () => {
        it('should call onChange when label is clicked', async () => {
            const user = userEvent.setup();
            const mockOnChange = jest.fn();
            rerenderView({
                onChange: mockOnChange,
                labels: labelsMock,
            });
            await user.click(screen.getByRole('button', { name: 'Click me' }));
            await user.click(screen.getAllByRole('checkbox')[0]);

            expect(mockOnChange).toHaveBeenCalledTimes(1);
        });
        it('should call onChange with label object once it was clicked', async () => {
            const user = userEvent.setup();
            const mockOnChange = jest.fn();
            rerenderView({
                onChange: mockOnChange,
                labels: labelsMock,
            });
            await user.click(screen.getByRole('button', { name: 'Click me' }));

            await user.click(screen.getAllByRole('checkbox')[0]);

            expect(mockOnChange).toHaveBeenCalledWith(labelsMock[0], expect.any(Object));

            await user.click(screen.getAllByRole('checkbox')[2]);

            expect(mockOnChange).toHaveBeenLastCalledWith(labelsMock[2], expect.any(Object));
        });

        it('should call onChange with with full label object (e.g. include key-values not included in the type)', async () => {
            const user = userEvent.setup();
            const mockOnChange = jest.fn();
            rerenderView({
                onChange: mockOnChange,
                labels: labelsMock,
            });
            await user.click(screen.getByRole('button', { name: 'Click me' }));

            await user.click(screen.getAllByRole('checkbox')[3]);

            expect(mockOnChange).toHaveBeenCalledWith(labelsMock[3], expect.any(Object));
        });

        it('should call onAdd when add button is clicked', async () => {
            const user = userEvent.setup();
            const mockOnAdd = jest.fn();
            rerenderView({
                onAdd: mockOnAdd,
                labels: labelsMock,
            });
            await user.click(screen.getByRole('button', { name: 'Click me' }));
            await user.type(screen.getByRole('textbox'), 'test');
            await user.click(screen.getAllByRole('button')[1]);

            expect(mockOnAdd).toHaveBeenCalledTimes(1);
            expect(mockOnAdd).toHaveBeenCalledWith('test');
        });

        it('should call onAdd when add ENTER is pressed', async () => {
            const user = userEvent.setup();
            const mockOnAdd = jest.fn();
            rerenderView({
                onAdd: mockOnAdd,
                labels: labelsMock,
            });
            await user.click(screen.getByRole('button', { name: 'Click me' }));
            await user.type(screen.getByRole('textbox'), 'test');
            await user.keyboard('[Enter]');

            expect(mockOnAdd).toHaveBeenCalledTimes(1);
            expect(mockOnAdd).toHaveBeenCalledWith('test');
        });

        it('should call onClose when dialog is closed due to outer click', async () => {
            const user = userEvent.setup();
            const clickDocument = useDocumentEvent('click');
            const mockOnClose = jest.fn();
            rerenderView({
                onClose: mockOnClose,
                labels: labelsMock,
            });

            expect(screen.queryAllByRole('dialog')).toHaveLength(0);

            // open dialog
            await user.click(screen.getByRole('button', { name: 'Click me' }));

            expect(screen.queryAllByRole('dialog').length).toBeGreaterThan(0);

            // click outside of component
            await waitFor(() => {
                clickDocument('click');
            });

            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });

        it('should call onClose when dialog is closed due to trigger button click', async () => {
            const user = userEvent.setup();
            const mockOnClose = jest.fn();
            rerenderView({
                onClose: mockOnClose,
                labels: labelsMock,
            });
            await user.click(screen.getByRole('button', { name: 'Click me' }));
            await user.click(screen.getAllByRole('button')[0]);

            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });
    });
});
