import React from 'react';
import toJson from 'enzyme-to-json';
import Pill from '../Pill';

describe('<Pill> component', () => {
    const childrenMock = jest.fn();
    const onClearMock = jest.fn();
    const nameMock = 'Pill name';
    const contentMock = 'Pill content';

    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <Pill onClear={onClearMock} name={nameMock} content={contentMock} doneLabel="Done">
                {childrenMock}
            </Pill>
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('PillButton')).toHaveLength(1);
        expect(wrapper.find('PillDropdown')).toHaveLength(0);
    });
    it('should open dropdown when button is clicked', () => {
        wrapper.find('.PillButton__pill').simulate('click');
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('PillButton')).toHaveLength(1);
        expect(wrapper.find('PillDropdown')).toHaveLength(1);
    });
    it('should close dropdown when button is clicked again', () => {
        wrapper.find('.PillButton__pill').simulate('click');
        expect(wrapper.find('PillDropdown')).toHaveLength(1);

        wrapper.find('.PillButton__pill').simulate('click');
        expect(wrapper.find('PillDropdown')).toHaveLength(0);
    });
    it('should render children when dropdown is open', () => {
        expect(childrenMock).not.toHaveBeenCalled();

        wrapper.find('.PillButton__pill').simulate('click');
        expect(wrapper.find('PillDropdown')).toHaveLength(1);
        expect(childrenMock).toHaveBeenCalledTimes(1);
    });
});
