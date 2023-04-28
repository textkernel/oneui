import React from 'react';
import toJson from 'enzyme-to-json';
import { PageWidthRestrictor } from '../PageWidthRestrictor';

describe('PageWidthRestrictor', () => {
    it('should render nothing if no children are provided', () => {
        const wrapper = shallow(<PageWidthRestrictor />);
        expect(wrapper.html()).toBeNull();
    });
    it('should render correctly', () => {
        const wrapper = shallow(<PageWidthRestrictor>Some children</PageWidthRestrictor>);
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('div')).toHaveLength(1);
    });
});
