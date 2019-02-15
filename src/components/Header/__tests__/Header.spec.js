import React from 'react';
import toJson from 'enzyme-to-json';
import Header from '../Header';

describe('Header component that renders a website header with a logo on the left and optional children on the right side', () => {
    it('should render correctly', () => {
        const wrapper = mount(
            <Header logoSrc="jobfeed-logo.svg">This is a placeholder for children</Header>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
