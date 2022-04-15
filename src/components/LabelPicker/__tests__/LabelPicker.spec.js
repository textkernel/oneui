import * as React from 'react';
// import toJson from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
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
                    <Button>Click me</Button>
                </LabelPicker>
            );
            expect(wrapper.find('div').length).toBe(0);

            // open dialog
            wrapper.find('Button').simulate('click');

            expect(wrapper.find('div').length).toBeGreaterThan(0);

            // close dialog
            wrapper.find('Button').simulate('click');

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
    describe('callbacks', () => {
        it.todo('should call onChange when label is clicked');
        it.todo('should call onChange with updated selection state once label was clicked');
        it.todo(
            'should call onChange with with full label object (e.g. include id even if it is not included in the type)'
        );

        it.todo('should call onAdd when add button is clicked');
        it.todo('should call onAdd when add ENTER is pressed');

        it.todo('should call onDone when add Done button is clicked');
        it.todo('should call onCancel on outer click');
    });
});
