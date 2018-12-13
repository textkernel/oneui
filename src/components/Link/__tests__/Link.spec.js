import React from 'react';
import toJson from 'enzyme-to-json';
import Link from '../Link';

describe('<Link> that renders a link', () => {
    it('should render default link correctly', () => {
        const wrapper = shallow(<Link href="https://textkernel.com">Click me</Link>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should add string html attributes correctly', () => {
        const wrapper = mount(
            <Link href="https://textkernel.com" target="_blank">
                Click me
            </Link>
        );
        expect(wrapper.find('a').prop('target')).toEqual('_blank');
    });
});
