import React from 'react';
import toJson from 'enzyme-to-json';
import Header from '../Header';
import { IconTextkernel } from '../../Icon';

describe('Header component that renders a website header with a logo on the left and optional children on the right side', () => {
    it('should render correctly with simple logo image', () => {
        const wrapper = mount(
            <Header logo={{ src: 'jobfeed-logo.svg' }}>This is a placeholder for children</Header>
        );
        expect(wrapper.find('img')).toHaveLength(1);
        expect(wrapper.find('a')).toHaveLength(0);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render correctly with simple logo image as a link', () => {
        const wrapper = mount(
            <Header logo={{ src: 'jobfeed-logo.svg', link: '/' }}>
                This is a placeholder for children
            </Header>
        );
        expect(wrapper.find('img')).toHaveLength(1);
        expect(wrapper.find('a')).toHaveLength(1);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render correctly with logo passed as component', () => {
        const logo = (
            <a href="/test">
                <IconTextkernel />
            </a>
        );
        const wrapper = mount(<Header logo={logo}>This is a placeholder for children</Header>);
        expect(wrapper.find('img')).toHaveLength(0);
        expect(wrapper.find('a')).toHaveLength(1);
        expect(wrapper.find(IconTextkernel)).toHaveLength(1);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
