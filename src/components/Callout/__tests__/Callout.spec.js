import React from 'react';
import toJson from 'enzyme-to-json';
import { Callout } from '../Callout';

describe('Callout', () => {
    it('should render correctly', () => {
        const wrapper = shallow(<Callout>some text</Callout>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should apply correctly warning context', () => {
        const wrapper = shallow(<Callout context="warning">some text</Callout>);
        expect(wrapper.find('.Callout').hasClass('Callout--context_warning')).toBe(true);
    });

    it('should apply correctly bad context', () => {
        const wrapper = shallow(<Callout context="bad">some text</Callout>);
        expect(wrapper.find('.Callout').hasClass('Callout--context_bad')).toBe(true);
    });

    it('should call onRequestClose', () => {
        const mockOnClick = jest.fn();
        const wrapper = shallow(<Callout onRequestClose={mockOnClick}>some text</Callout>);
        wrapper.find('.Callout__closeButton').simulate('click');
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});
