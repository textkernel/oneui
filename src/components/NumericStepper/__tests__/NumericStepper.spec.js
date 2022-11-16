import React from 'react';
import { act } from 'react-dom/test-utils';
import toJson, { createSerializer } from 'enzyme-to-json';
import { NumericStepper } from '../NumericStepper';

describe('<NumericStepper> component', () => {
    let wrapper;
    const onChangeMock = jest.fn();

    afterEach(() => {
        jest.resetAllMocks();
    });

    const decreaseClick = () => {
        wrapper.find('StepperButton').at(0).prop('onClick')();
    };

    const increaseClick = () => {
        wrapper.find('StepperButton').at(1).prop('onClick')();
    };

    it('should render correctly', () => {
        wrapper = mount(<NumericStepper onChange={onChangeMock} />);

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('input')).toHaveLength(1);
        expect(wrapper.find('StepperButton')).toHaveLength(2);
    });
    it('should have correct values with default props', () => {
        wrapper = mount(<NumericStepper onChange={onChangeMock} />);

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

        // Decrease by 2 (to equal to 2) and make sure that number of onChange calls equal to 1
        act(() => {
            decreaseClick();
        });
        wrapper.update();

        expect(onChangeMock).toBeCalledTimes(1);
        expect(onChangeMock).toBeCalledWith(2);
        expect(wrapper.find('input').prop('value')).toEqual('2');
        expect(onChangeMock).toHaveBeenCalledWith(2);

        // Decrease by 2 (to equal to 0) and make sure that number of onChange calls equal to 2
        act(() => {
            decreaseClick();
        });
        wrapper.update();

        expect(onChangeMock).toBeCalledTimes(2);
        expect(onChangeMock).toBeCalledWith(0);
        expect(wrapper.find('input').prop('value')).toEqual('0');
        expect(onChangeMock).toHaveBeenCalledWith(0);
    });
    it('should react on stepUp click', () => {
        wrapper = mount(<NumericStepper onChange={onChangeMock} step={2} />);

        // Increase by 2 (to equal to 2) and make sure that number of onChange calls equal to 1
        act(() => {
            increaseClick();
        });
        wrapper.update();

        expect(onChangeMock).toBeCalledTimes(1);
        expect(onChangeMock).toBeCalledWith(2);
        expect(wrapper.find('input').prop('value')).toEqual('2');
        expect(onChangeMock).toHaveBeenCalledWith(2);

        // Increase by 2 (to equal to 4) and make sure that number of onChange calls equal to 2
        act(() => {
            increaseClick();
        });
        wrapper.update();

        expect(onChangeMock).toBeCalledTimes(2);
        expect(onChangeMock).toBeCalledWith(4);
        expect(wrapper.find('input').prop('value')).toEqual('4');
        expect(onChangeMock).toHaveBeenCalledWith(4);
    });
    it('should disable buttons when limits are reached', () => {
        wrapper = mount(
            <NumericStepper onChange={onChangeMock} minValue={1} maxValue={3} defaultValue={2} />
        );

        // Simulate two clicks on stepUp button
        act(() => {
            increaseClick();
        });
        wrapper.update();

        expect(wrapper.find('input').prop('value')).toEqual('3');
        expect(onChangeMock).toBeCalledTimes(1);
        expect(wrapper.find('StepperButton').at(1).prop('disabled')).toBe(true);
        expect(onChangeMock).toHaveBeenCalledWith(3);

        // Simulate two clicks on stepDown button
        act(() => {
            decreaseClick();
        });
        wrapper.update();
        expect(onChangeMock).toBeCalledTimes(2);

        act(() => {
            decreaseClick();
        });
        wrapper.update();
        expect(onChangeMock).toBeCalledTimes(3);

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
    it('should set value to the previous one when user enters invalid value', () => {
        wrapper = mount(
            <NumericStepper onChange={onChangeMock} minValue={2} maxValue={4} defaultValue={3} />
        );

        act(() => {
            increaseClick();
        });
        wrapper.update();

        expect(onChangeMock).toBeCalledTimes(1);
        expect(onChangeMock).toBeCalledWith(4);
        expect(wrapper.find('input').prop('value')).toEqual('4');
        expect(onChangeMock).toHaveBeenCalledWith(4);

        // Imagine users enters empty string
        const data = { target: { value: '   ' } };
        act(() => {
            wrapper.find('input').simulate('change', data);
        });
        wrapper.find('input').simulate('blur');
        wrapper.update();

        expect(wrapper.find('input').prop('value')).toEqual('4');
    });
    it('should correctly react on increase click when top edge is overstepped', () => {
        wrapper = mount(
            <NumericStepper onChange={onChangeMock} step={2} maxValue={4} defaultValue={3} />
        );

        act(() => {
            increaseClick();
        });
        wrapper.update();

        expect(onChangeMock).toBeCalledWith(4);
        expect(wrapper.find('input').prop('value')).toEqual('4');
        expect(onChangeMock).toHaveBeenCalledWith(4);
    });
    it('should correctly react on decrease click when bottom edge is overstepped', () => {
        wrapper = mount(
            <NumericStepper onChange={onChangeMock} step={2} minValue={3} defaultValue={4} />
        );

        act(() => {
            decreaseClick();
        });
        wrapper.update();

        expect(onChangeMock).toBeCalledWith(3);
        expect(wrapper.find('input').prop('value')).toEqual('3');
        expect(onChangeMock).toHaveBeenCalledWith(3);
    });
    it('should react on keyup/keydown press', () => {
        /**
         * TODO: Test with E2E tests.
         * As we actually validate data on blur, its quite challenging to chain together mouseEnter, keyDown and blur.
         * I've tried multiple ways to do it, and don't want to spend way more time on that.
         */
    });
    describe('when props change', () => {
        beforeEach(() => {
            wrapper = mount(
                <NumericStepper
                    onChange={onChangeMock}
                    step={2}
                    minValue={3}
                    maxValue={10}
                    defaultValue={6}
                />
            );
        });
        it('should set the displayed value to the defaultValue', () => {
            expect(wrapper.find('input').prop('value')).toBe('6');

            wrapper.setProps({ defaultValue: 7 });
            wrapper.update();
            expect(wrapper.find('input').prop('value')).toBe('7');
        });
        it('should set the displayed value to max allowed if it set to lower then current value', () => {
            expect(wrapper.find('input').prop('value')).toBe('6');

            wrapper.setProps({ maxValue: 5 });
            wrapper.update();
            expect(wrapper.find('input').prop('value')).toBe('5');
        });
        it('should set the displayed value to min allowed if it set to higher then current value', () => {
            expect(wrapper.find('input').prop('value')).toBe('6');

            wrapper.setProps({ minValue: 8 });
            wrapper.update();
            expect(wrapper.find('input').prop('value')).toBe('8');
        });
    });
});
