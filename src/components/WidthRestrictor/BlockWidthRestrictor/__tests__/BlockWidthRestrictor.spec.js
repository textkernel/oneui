import React from 'react';
import toJson from 'enzyme-to-json';
import { BlockWidthRestrictor } from '../BlockWidthRestrictor';

describe('BlockWidthRestrictor', () => {
    it('should render nothing if no children are provided', () => {
        const wrapper = shallow(<BlockWidthRestrictor />);
        expect(wrapper.html()).toBeNull();
    });
    it('should render correctly', () => {
        const wrapper = shallow(<BlockWidthRestrictor>Some children</BlockWidthRestrictor>);
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('div')).toHaveLength(1);
    });
    it('should render correctly when element type is defined', () => {
        const wrapper = shallow(
            <BlockWidthRestrictor As="nav">Some children</BlockWidthRestrictor>
        );

        expect(wrapper.find('div')).toHaveLength(0);
        expect(wrapper.find('nav')).toHaveLength(1);
    });
});
