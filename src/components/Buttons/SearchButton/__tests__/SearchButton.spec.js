import React from 'react';
import toJson from 'enzyme-to-json';
import SearchButton from '../SearchButton';

describe('<SearchButton> that renders a search button', () => {
    it('should render default button correctly', () => {
        const wrapper = mount(<SearchButton />);
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('button')).toHaveLength(1);
    });
    it('should call click callback correctly', () => {
        const onClickMock = jest.fn();
        const wrapper = mount(<SearchButton onClick={onClickMock} />);
        wrapper.find('button').simulate('click');
        expect(onClickMock).toHaveBeenCalled();
    });
});
