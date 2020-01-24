import React from 'react';
import toJson from 'enzyme-to-json';
import { Chip } from '../Chip';

describe('<Chip> that renders a pill shaped chip', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<Chip>some text</Chip>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
