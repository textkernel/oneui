import * as React from 'react';
import toJson from 'enzyme-to-json';
import { SelectButtonGroup } from '../SelectButtonGroup';
import { SelectButton } from '../../SelectButton';

describe('SelectButtonGroup', () => {
    let wrapper;
    let getButton;
    const onChangeMock = jest.fn();

    beforeEach(() => {
        wrapper = mount(
            <SelectButtonGroup defaultValue={['1']} onChange={onChangeMock}>
                <SelectButton value="1" key="1">
                    Option 1
                </SelectButton>
                <SelectButton value="2" key="2">
                    Option 2
                </SelectButton>
                <SelectButton value="3" key="3">
                    Option 3
                </SelectButton>
            </SelectButtonGroup>
        );
        getButton = (number) => wrapper.find('SelectButton').at(number);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    describe('Single select mode', () => {
        it('should not change isSelect prop of children on initial render', () => {
            expect(getButton(0).prop('isSelected')).toBeTruthy();
            expect(getButton(1).prop('isSelected')).toBeFalsy();
            expect(getButton(2).prop('isSelected')).toBeFalsy();
        });
        it('should switch the selected option if a not-selected option is clicked', () => {
            getButton(1).simulate('click');

            expect(getButton(0).prop('isSelected')).toBeFalsy();
            expect(getButton(1).prop('isSelected')).toBeTruthy();
            expect(getButton(2).prop('isSelected')).toBeFalsy();
        });
        it('should allow empty selection if field is not required', () => {
            getButton(0).simulate('click');

            expect(getButton(0).prop('isSelected')).toBeFalsy();
            expect(getButton(1).prop('isSelected')).toBeFalsy();
            expect(getButton(2).prop('isSelected')).toBeFalsy();
        });
        it('should not allow empty selection if field is required', () => {
            wrapper.setProps({ isRequired: true });
            getButton(0).simulate('click');

            expect(getButton(0).prop('isSelected')).toBeTruthy();
            expect(getButton(1).prop('isSelected')).toBeFalsy();
            expect(getButton(2).prop('isSelected')).toBeFalsy();
        });

        it('should call onChange with correct parameters', () => {
            getButton(1).simulate('click');
            expect(onChangeMock).toHaveBeenLastCalledWith([getButton(1).prop('value')]);

            getButton(0).simulate('click');
            expect(onChangeMock).toHaveBeenLastCalledWith([getButton(0).prop('value')]);

            getButton(0).simulate('click');
            expect(onChangeMock).toHaveBeenLastCalledWith([]);
        });
    });
    describe('Multi select mode', () => {
        beforeEach(() => {
            wrapper.setProps({ isMultiselect: true });
        });

        it('should not change isSelect prop of children on initial render', () => {
            expect(getButton(0).prop('isSelected')).toBeTruthy();
            expect(getButton(1).prop('isSelected')).toBeFalsy();
            expect(getButton(2).prop('isSelected')).toBeFalsy();
        });
        it('should switch to selected if a not-selected option is clicked, without changing others', () => {
            getButton(1).simulate('click');

            expect(getButton(0).prop('isSelected')).toBeTruthy();
            expect(getButton(1).prop('isSelected')).toBeTruthy();
            expect(getButton(2).prop('isSelected')).toBeFalsy();

            getButton(2).simulate('click');

            expect(getButton(0).prop('isSelected')).toBeTruthy();
            expect(getButton(1).prop('isSelected')).toBeTruthy();
            expect(getButton(2).prop('isSelected')).toBeTruthy();
        });
        it('should switch to not-selected if a selected option is clicked, without changing others', () => {
            getButton(1).simulate('click');

            expect(getButton(0).prop('isSelected')).toBeTruthy();
            expect(getButton(1).prop('isSelected')).toBeTruthy();
            expect(getButton(2).prop('isSelected')).toBeFalsy();

            getButton(1).simulate('click');

            expect(getButton(0).prop('isSelected')).toBeTruthy();
            expect(getButton(1).prop('isSelected')).toBeFalsy();
            expect(getButton(2).prop('isSelected')).toBeFalsy();

            getButton(1).simulate('click');
            getButton(0).simulate('click');

            expect(getButton(0).prop('isSelected')).toBeFalsy();
            expect(getButton(1).prop('isSelected')).toBeTruthy();
            expect(getButton(2).prop('isSelected')).toBeFalsy();
        });
        it('should not allow deletion of last value if field is required', () => {
            wrapper.setProps({ isRequired: true });
            getButton(0).simulate('click');

            expect(getButton(0).prop('isSelected')).toBeTruthy();
            expect(getButton(1).prop('isSelected')).toBeFalsy();
            expect(getButton(2).prop('isSelected')).toBeFalsy();

            getButton(1).simulate('click');

            expect(getButton(0).prop('isSelected')).toBeTruthy();
            expect(getButton(1).prop('isSelected')).toBeTruthy();
            expect(getButton(2).prop('isSelected')).toBeFalsy();

            getButton(0).simulate('click');

            expect(getButton(0).prop('isSelected')).toBeFalsy();
            expect(getButton(1).prop('isSelected')).toBeTruthy();
            expect(getButton(2).prop('isSelected')).toBeFalsy();

            getButton(1).simulate('click');

            expect(getButton(0).prop('isSelected')).toBeFalsy();
            expect(getButton(1).prop('isSelected')).toBeTruthy();
            expect(getButton(2).prop('isSelected')).toBeFalsy();
        });

        it('should call onChange with correct parameters', () => {
            getButton(1).simulate('click');
            expect(onChangeMock).toHaveBeenLastCalledWith([
                getButton(0).prop('value'),
                getButton(1).prop('value'),
            ]);

            getButton(2).simulate('click');
            expect(onChangeMock).toHaveBeenLastCalledWith([
                getButton(0).prop('value'),
                getButton(1).prop('value'),
                getButton(2).prop('value'),
            ]);

            getButton(1).simulate('click');
            expect(onChangeMock).toHaveBeenLastCalledWith([
                getButton(0).prop('value'),
                getButton(2).prop('value'),
            ]);

            getButton(0).simulate('click');
            getButton(2).simulate('click');
            expect(onChangeMock).toHaveBeenLastCalledWith([]);
        });
    });

    describe('Controlled behavior', () => {
        beforeEach(() => {
            wrapper.setProps({
                value: ['1'],
                defaultValue: undefined,
            });
        });

        it('should render correctly', () => {
            expect(toJson(wrapper)).toMatchSnapshot();
        });

        it('should call onChange with correct parameters', () => {
            expect(getButton(0).prop('isSelected')).toBeTruthy();
            getButton(1).simulate('click');
            expect(onChangeMock).toHaveBeenLastCalledWith(getButton(1).prop('value'));
        });
    });
});
