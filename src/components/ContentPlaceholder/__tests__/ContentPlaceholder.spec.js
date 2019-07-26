import React from 'react';
import toJson from 'enzyme-to-json';
import ContentPlaceholder from '../ContentPlaceholder';

describe('<ContentPlaceholder> that renders a content placeholder', () => {
    it('should render default placeholder', () => {
        const wrapper = shallow(<ContentPlaceholder />);
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.props().style).toEqual({
            animationDuration: '1s',
            height: null,
        });
        expect(wrapper.childAt(1).props().style).toEqual({
            width: '0%',
        });
    });

    it('should affect styles when props are changed', () => {
        const wrapper = shallow(
            <ContentPlaceholder duration={3} height={30} width={60} withoutMargin />
        );

        expect(wrapper.props().style).toEqual({
            animationDuration: '3s',
            height: 30,
        });

        expect(wrapper.childAt(1).props().style).toEqual({
            width: '40%',
        });

        expect(wrapper.hasClass('ContentPlaceholder--withoutMargin')).toBe(true);
    });
});
