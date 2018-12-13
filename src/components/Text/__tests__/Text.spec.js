import React from 'react';
import toJson from 'enzyme-to-json';
import Text from '../Text';

describe('<Text> that renders a text block', () => {
    it('should render default text block correctly', () => {
        const wrapper = shallow(<Text>Some text content</Text>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should add classes when props are changed', () => {
        const wrapper = shallow(
            <Text inline muted>
                Some inline, muted text content
            </Text>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
