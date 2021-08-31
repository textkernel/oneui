import React from 'react';
import toJson, { createSerializer } from 'enzyme-to-json';
import { NumericStepper } from '../NumericStepper';
import { on } from 'events';

describe('<NumericStepper> component', () => {
    let wrapper;
    const onChangeMock = jest.fn();

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render correctly', () => {
        wrapper = mount(<NumericStepper onChange={onChangeMock} />);

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('input')).toHaveLength(1);
        expect(wrapper.find('StepperButton')).toHaveLength(2);
    });
    it('should have correct values with default props', () => {
        wrapper = mount(<NumericStepper onChange={onChangeMock} />);

        expect(wrapper.prop('defaultValue')).toEqual(0);
        expect(wrapper.prop('step')).toEqual(1);
        expect(wrapper.prop('minValue')).toEqual(0);
        expect(wrapper.prop('maxValue')).toEqual(9007199254740991);
        expect(wrapper.prop('customWidth')).toEqual('3ch');

        const input = wrapper.find('input');
        expect(input.prop('value')).toEqual('0');
        expect(input.prop('step')).toEqual(1);
        expect(input.prop('min')).toEqual(0);
        expect(input.prop('max')).toEqual(9007199254740991);
        expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
        expect(toJson(input).node.props.style.width).toBe('3ch');

        expect(wrapper.find('StepperButton').at(0).prop('disabled')).toBe(true);
        expect(wrapper.find('StepperButton').at(1).prop('disabled')).toBe(false);
    });
    it('should have correct values with custom props', () => {
        wrapper = mount(
            <NumericStepper
                onChange={onChangeMock}
                step={2}
                minValue={2}
                maxValue={6}
                defaultValue={4}
                customWidth="4ch"
            />
        );

        expect(wrapper.prop('defaultValue')).toEqual(4);
        expect(wrapper.prop('step')).toEqual(2);
        expect(wrapper.prop('minValue')).toEqual(2);
        expect(wrapper.prop('maxValue')).toEqual(6);
        expect(wrapper.prop('customWidth')).toEqual('4ch');

        const input = wrapper.find('input');
        expect(input.prop('value')).toEqual('4');
        expect(input.prop('step')).toEqual(2);
        expect(input.prop('min')).toEqual(2);
        expect(input.prop('max')).toEqual(6);
        expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
        expect(toJson(input).node.props.style.width).toBe('4ch');

        expect(wrapper.find('StepperButton').at(0).prop('disabled')).toBe(false);
        expect(wrapper.find('StepperButton').at(1).prop('disabled')).toBe(false);
    });
    it('should react on stepDown click', () => {
        wrapper = mount(<NumericStepper onChange={onChangeMock} step={2} defaultValue={4} />);

        // CASE: Decrease by 2 (to equal to 2) and make sure that number of onChange calls equal to 1
        wrapper.find('StepperButton').at(0).prop('onClick')();
        wrapper.update();
        expect(onChangeMock).toBeCalledTimes(1);
        expect(onChangeMock).toBeCalledWith(2);
        expect(wrapper.find('input').prop('value')).toEqual('2');

        // CASE: Decrease by 2 (to equal to 0) and make sure that number of onChange calls equal to 2
        wrapper.find('StepperButton').at(0).prop('onClick')();
        wrapper.update();
        expect(onChangeMock).toBeCalledTimes(2);
        expect(onChangeMock).toBeCalledWith(0);
        expect(wrapper.find('input').prop('value')).toEqual('0');
    });
    it('should react on stepUp click', () => {
        wrapper = mount(<NumericStepper onChange={onChangeMock} step={2} />);

        // CASE: Increase by 2 (to equal to 2) and make sure that number of onChange calls equal to 1
        wrapper.find('StepperButton').at(1).prop('onClick')();
        wrapper.update();
        expect(onChangeMock).toBeCalledTimes(1);
        expect(onChangeMock).toBeCalledWith(2);
        expect(wrapper.find('input').prop('value')).toEqual('2');

        // CASE: Increase by 2 (to equal to 4) and make sure that number of onChange calls equal to 2
        wrapper.find('StepperButton').at(1).prop('onClick')();
        wrapper.update();
        expect(onChangeMock).toBeCalledTimes(2);
        expect(onChangeMock).toBeCalledWith(4);
        expect(wrapper.find('input').prop('value')).toEqual('4');
    });
    it('should disable buttons when limits are reached', () => {
        wrapper = mount(
            <NumericStepper onChange={onChangeMock} minValue={1} maxValue={3} defaultValue={2} />
        );

        // Simulate two clicks on stepUp button
        wrapper.find('StepperButton').at(1).prop('onClick')();
        wrapper.update();

        expect(wrapper.find('input').prop('value')).toEqual('3');
        expect(onChangeMock).toBeCalledTimes(1);
        expect(wrapper.find('StepperButton').at(1).prop('disabled')).toBe(true);

        // Simulate two clicks on stepDown button
        wrapper.find('StepperButton').at(0).prop('onClick')();
        expect(onChangeMock).toBeCalledTimes(2);
        wrapper.update();
        wrapper.find('StepperButton').at(0).prop('onClick')();
        expect(onChangeMock).toBeCalledTimes(3);
        wrapper.update();

        expect(wrapper.find('input').prop('value')).toEqual('1');
        expect(wrapper.find('StepperButton').at(0).prop('disabled')).toBe(true);
    });
    it('should set bottom edge value if user enters value below allowed limit', () => {
        wrapper = mount(<NumericStepper onChange={onChangeMock} minValue={10} />);
        const data = { target: { value: '9' } };

        wrapper.find('input').simulate('change', data);
        wrapper.find('input').simulate('blur');

        expect(wrapper.find('input').prop('value')).toEqual('10');
    });
    it('should set top edge value if user enters value above allowed limit', () => {
        wrapper = mount(<NumericStepper onChange={onChangeMock} maxValue={10} />);
        const data = { target: { value: '11' } };

        wrapper.find('input').simulate('change', data);
        wrapper.find('input').simulate('blur');

        expect(wrapper.find('input').prop('value')).toEqual('10');
    });
    it('should react on keyup/keydown press', () => {
        /**
         * TODO: Test with E2E tests.
         * As we actually validate data on blur, its quite challenging to chain together mouseEnter, keyDown and blur.
         * I've tried multiple ways to do it, and don't want to spend way more time on that.
         */
    });
});
