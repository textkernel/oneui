import React from 'react';
import toJson from 'enzyme-to-json';
import { IconExtract } from '../IconExtract';

describe('<IconExtract>', () => {
    it('should render an Extract icon', () => {
        const wrapper = shallow(<IconExtract />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
