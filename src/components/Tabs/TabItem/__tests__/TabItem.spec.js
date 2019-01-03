import React from 'react';
import toJson from 'enzyme-to-json';
import TabItem from '../TabItem';

describe('<TabItem>', () => {
    it('should render a tab item correctly', () => {
        const wrapper = shallow(<TabItem label="Some tab" />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should add classes for props', () => {
        const wrapper = shallow(<TabItem label="Some tab" isActive />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should allow node type labels', () => {
        const wrapper = shallow(<TabItem label={<strong>Some tab</strong>} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
