import React from 'react';
import toJson from 'enzyme-to-json';
import Heading from '../Heading';

describe('<Heading> that renders a heading', () => {
    it('should render default heading correctly', () => {
        const wrapper = shallow(<Heading>Some heading text</Heading>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should add classes when props are changed', () => {
        const wrapper = shallow(
            <Heading level="h3" alignRight>
                Some heading text
            </Heading>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
