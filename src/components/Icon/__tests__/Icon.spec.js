import React from 'react';
import toJson from 'enzyme-to-json';
import Icon from '../Icon';

describe('<Icon> that renders an icon', () => {
    it('should render a default icon', () => {
        const wrapper = shallow(<Icon name="textkernel" />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render an icon with custom context, size and title', () => {
        const wrapper = shallow(
            <Icon name="textkernel" context="neutral" size={128} title="My icon" />
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should not allow negative sizes', () => {
        const wrapper = shallow(<Icon name="textkernel" size={-1} />);
        expect(wrapper.find('svg').prop('style')).toEqual({
            top: 'auto',
            width: 0,
            height: 0
        });
    });
});
