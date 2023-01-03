import React from 'react';
import toJson from 'enzyme-to-json';
import { MarkedText } from '../MarkedText';

describe('<MarkedText> that renders a text block while marking matched substrings', () => {
    it('should render correctly when there are no matches', () => {
        const wrapper = mount(<MarkedText marker="else">Some text content</MarkedText>);
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('mark')).toHaveLength(0);
    });
    it('should render correctly when empty marker passed', () => {
        const wrapper = mount(<MarkedText marker="">Some text content</MarkedText>);
        expect(wrapper.find('mark')).toHaveLength(0);
    });
    it('should render correctly when there are matches', () => {
        const wrapper = mount(<MarkedText marker="text">Some text content</MarkedText>);
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('mark')).toHaveLength(1);
    });
    it('should render correctly with multiple matches', () => {
        const wrapper = mount(
            <MarkedText marker="te">Some text content that has text more then once</MarkedText>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('mark')).toHaveLength(3);
    });
    it('should mark special characters', () => {
        const wrapper = mount(
            // eslint-disable-next-line react/no-unescaped-entities
            <MarkedText marker=".?!#$%^&()[]:;\?''">.?!#$%^&()[]:;\?''</MarkedText>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('mark')).toHaveLength(1);
    });
    it('should pass props to Text', () => {
        const wrapper = mount(
            <MarkedText marker="text" inline context="primary">
                Some text content
            </MarkedText>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
