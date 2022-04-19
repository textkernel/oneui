import * as React from 'react';
// import toJson from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import { LabelPicker } from '../LabelPicker';
import { Button } from '../../Buttons';
import { useDocumentEvent } from '../../../utils/testUtils';
import { ENTER_KEY } from '../../../constants';

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

describe('<LabelPicker> that renders a dropdown type component to apply/remove/add labels', () => {
    describe('snapshot tests', () => {
        it.todo('should render correctly in closed state');
        it.todo('should render correctly with dialog open');
    });
    describe('trigger button', () => {
        it('should render trigger button correctly', () => {
            const wrapper = mount(
                <LabelPicker labels={[]}>
                    <Button>Click me</Button>
                </LabelPicker>
            );
            expect(wrapper.find('Button')).toHaveLength(1);
            expect(wrapper.text()).toBe('Click me');
        });
        it('should call original onClick handler from trigger button (passed with the prop)', () => {
            const onClick = jest.fn();
            const wrapper = mount(
                <LabelPicker labels={[]}>
                    <Button onClick={onClick}>Click me</Button>
                </LabelPicker>
            );

            wrapper.find('Button').simulate('click');
            expect(onClick).toHaveBeenCalledTimes(1);
        });
    });
    describe('toggling dialog visibility', () => {
        it('should toggle dialog when trigger button is clicked', () => {
            const wrapper = mount(
                <LabelPicker labels={[]}>
                    <Button id="trigger">Click me</Button>
                </LabelPicker>
            );
            expect(wrapper.find('div').length).toBe(0);

            // open dialog
            wrapper.find('#trigger').at(0).simulate('click');

            expect(wrapper.find('div').length).toBeGreaterThan(0);

            // close dialog
            wrapper.find('#trigger').at(0).simulate('click');

            expect(wrapper.find('div').length).toBe(0);
        });
        it('should close dialog on outer click', () => {
            const clickDocument = useDocumentEvent('click');

            const wrapper = mount(
                <LabelPicker labels={[]}>
                    <Button>Click me</Button>
                </LabelPicker>
            );
            expect(wrapper.find('div').length).toBe(0);

            // open dialog
            wrapper.find('Button').simulate('click');

            expect(wrapper.find('div').length).toBeGreaterThan(0);

            // click outside of component
            act(() => {
                clickDocument();
            });
            wrapper.update();

            expect(wrapper.find('div').length).toBe(0);
        });
        it('should not close dialog when it was clicked (e.g. a checkbox within the dialog etc.)', () => {
            const wrapper = mount(
                <LabelPicker labels={[]}>
                    <Button>Click me</Button>
                </LabelPicker>
            );
            expect(wrapper.find('div').length).toBe(0);

            // open dialog
            wrapper.find('Button').simulate('click');

            expect(wrapper.find('div').length).toBeGreaterThan(0);

            // click in the dialog
            wrapper.find('Input').simulate('click');

            expect(wrapper.find('div').length).toBeGreaterThan(0);
        });
        it.todo('should close dialog when Done button is clicked');
    });
    describe('labels rendering', () => {
        it('should render dialog with empty labels list', () => {
            const wrapper = mount(
                <LabelPicker labels={[]}>
                    <Button>Click me</Button>
                </LabelPicker>
            );
            wrapper.find('Button').simulate('click');
            expect(wrapper.find('Checkbox').length).toBe(0);
        });
        it('should render dialog with labels', () => {
            const wrapper = mount(
                <LabelPicker labels={labelsMock}>
                    <Button>Click me</Button>
                </LabelPicker>
            );
            wrapper.find('Button').simulate('click');
            expect(wrapper.find('Checkbox').length).toBe(labelsMock.length);
        });
        it('should render count when it is passed', () => {
            const wrapper = mount(
                <LabelPicker labels={labelsMock}>
                    <Button>Click me</Button>
                </LabelPicker>
            );
            wrapper.find('Button').simulate('click');
            expect(wrapper.find('Checkbox').at(1).text()).toContain(labelsMock[1].count);
        });
        it('should not render 0 count', () => {
            const wrapper = mount(
                <LabelPicker labels={labelsMock}>
                    <Button>Click me</Button>
                </LabelPicker>
            );
            wrapper.find('Button').simulate('click');
            expect(wrapper.find('Checkbox').at(2).text()).not.toContain('0');
        });
        it('should set label selection state according to props passed', () => {
            const wrapper = mount(
                <LabelPicker labels={labelsMock}>
                    <Button>Click me</Button>
                </LabelPicker>
            );
            wrapper.find('Button').simulate('click');
            expect(wrapper.find('Checkbox').at(0).prop('checked')).toBeFalsy();
            expect(wrapper.find('Checkbox').at(1).prop('checked')).toBeTruthy();
            expect(wrapper.find('Checkbox').at(2).prop('checked')).toBeFalsy();
        });
    });
    describe('Input rendering', () => {
        it('should have add button enabled only when there is input text in the field', () => {
            const wrapper = mount(
                <LabelPicker labels={labelsMock}>
                    <Button id="trigger">Click me</Button>
                </LabelPicker>
            );
            wrapper.find('#trigger').at(0).simulate('click');

            expect(wrapper.find('Button').at(1).prop('disabled')).toBeTruthy();

            wrapper
                .find('Input')
                .find('input')
                .simulate('change', {
                    target: {
                        value: 'test',
                    },
                });
            expect(wrapper.find('Button').at(1).prop('disabled')).toBeFalsy();

            wrapper
                .find('Input')
                .find('input')
                .simulate('change', {
                    target: {
                        value: '',
                    },
                });
            expect(wrapper.find('Button').at(1).prop('disabled')).toBeTruthy();
        });
    });
    describe('callbacks', () => {
        it('should call onChange when label is clicked', () => {
            const mockOnChange = jest.fn();
            const wrapper = mount(
                <LabelPicker labels={labelsMock} onChange={mockOnChange}>
                    <Button>Click me</Button>
                </LabelPicker>
            );
            wrapper.find('Button').simulate('click');
            wrapper.find('Checkbox').at(0).find('input').simulate('change');
            expect(mockOnChange).toHaveBeenCalledTimes(1);
        });
        it('should call onChange with label object once it was clicked', () => {
            const mockOnChange = jest.fn();
            const wrapper = mount(
                <LabelPicker labels={labelsMock} onChange={mockOnChange}>
                    <Button>Click me</Button>
                </LabelPicker>
            );
            wrapper.find('Button').simulate('click');

            wrapper.find('Checkbox').at(0).find('input').simulate('change');
            expect(mockOnChange).toHaveBeenCalledWith(labelsMock[0], expect.any(Object));

            wrapper.find('Checkbox').at(2).find('input').simulate('change');
            expect(mockOnChange).toHaveBeenLastCalledWith(labelsMock[2], expect.any(Object));
        });
        it('should call onChange with with full label object (e.g. include key-values not included in the type)', () => {
            const mockOnChange = jest.fn();
            const wrapper = mount(
                <LabelPicker labels={labelsMock} onChange={mockOnChange}>
                    <Button>Click me</Button>
                </LabelPicker>
            );
            wrapper.find('Button').simulate('click');

            wrapper.find('Checkbox').at(3).find('input').simulate('change');
            expect(mockOnChange).toHaveBeenCalledWith(labelsMock[3], expect.any(Object));
        });

        it('should call onAdd when add button is clicked', () => {
            const mockOnAdd = jest.fn();
            const wrapper = mount(
                <LabelPicker labels={labelsMock} onAdd={mockOnAdd}>
                    <Button id="trigger">Click me</Button>
                </LabelPicker>
            );
            wrapper.find('#trigger').at(0).simulate('click');
            wrapper
                .find('Input')
                .find('input')
                .simulate('change', {
                    target: {
                        value: 'test',
                    },
                });
            wrapper.find('Button').at(1).simulate('click');
            expect(mockOnAdd).toHaveBeenCalledTimes(1);
            expect(mockOnAdd).toHaveBeenCalledWith('test');
        });
        it('should call onAdd when add ENTER is pressed', () => {
            const mockOnAdd = jest.fn();
            const wrapper = mount(
                <LabelPicker labels={labelsMock} onAdd={mockOnAdd}>
                    <Button id="trigger">Click me</Button>
                </LabelPicker>
            );
            wrapper.find('#trigger').at(0).simulate('click');
            wrapper
                .find('Input')
                .find('input')
                .simulate('change', {
                    target: {
                        value: 'test',
                    },
                });
            wrapper.find('Input').find('input').simulate('keydown', {
                key: ENTER_KEY,
            });
            expect(mockOnAdd).toHaveBeenCalledTimes(1);
            expect(mockOnAdd).toHaveBeenCalledWith('test');
        });

        it('should call onClose when dialog is closed due to Done button click', () => {
            const mockOnClose = jest.fn();
            const wrapper = mount(
                <LabelPicker labels={labelsMock} onClose={mockOnClose}>
                    <Button>Click me</Button>
                </LabelPicker>
            );
            wrapper.find('Button').simulate('click');

            wrapper.find('Button').at(2).simulate('click');
            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });
        it('should call onClose when dialog is closed due to outer click', () => {
            const clickDocument = useDocumentEvent('click');
            const mockOnClose = jest.fn();

            const wrapper = mount(
                <LabelPicker labels={[]} onClose={mockOnClose}>
                    <Button>Click me</Button>
                </LabelPicker>
            );
            expect(wrapper.find('div').length).toBe(0);

            // open dialog
            wrapper.find('Button').simulate('click');

            expect(wrapper.find('div').length).toBeGreaterThan(0);

            // click outside of component
            act(() => {
                clickDocument();
            });
            wrapper.update();

            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });
        it('should call onClose when dialog is closed due to trigger button click', () => {
            const mockOnClose = jest.fn();
            const wrapper = mount(
                <LabelPicker labels={labelsMock} onClose={mockOnClose}>
                    <Button>Click me</Button>
                </LabelPicker>
            );
            wrapper.find('Button').simulate('click');

            wrapper.find('Button').at(0).simulate('click');
            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });
    });
});
