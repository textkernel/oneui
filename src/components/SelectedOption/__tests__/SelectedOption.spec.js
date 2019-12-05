import React from 'react';
import toJson from 'enzyme-to-json';
import SelectedOption from '../SelectedOption';

describe('<SelectedOption>', () => {
    const onDeleteMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render default props correctly', () => {
        const wrapper = mount(<SelectedOption onDelete={onDeleteMock}>My option</SelectedOption>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render in appropriate HTML tag', () => {
        const wrapper = mount(
            <SelectedOption onDelete={onDeleteMock} As="li">
                My option
            </SelectedOption>
        );
        expect(wrapper.find('li')).toHaveLength(1);
    });

    it('should call onDelete when button clicked', () => {
        const wrapper = mount(<SelectedOption onDelete={onDeleteMock}>My option</SelectedOption>);
        wrapper.find('button').simulate('click');
        expect(onDeleteMock).toHaveBeenCalled();
    });
});
