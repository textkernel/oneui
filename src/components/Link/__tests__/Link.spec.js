import React from 'react';
import toJson from 'enzyme-to-json';
import { Link } from '../Link';

describe('<Link> that renders a link', () => {
    it('should render nothing if no children are provided', () => {
        const wrapper = shallow(<Link href="https://textkernel.com" />);
        expect(wrapper.html()).toBeNull();
    });
    it('should render children when it is 0', () => {
        const wrapper = shallow(<Link href="https://textkernel.com">{0}</Link>);
        expect(wrapper.html()).not.toBeNull();
    });
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
