import React from 'react';
import toJson from 'enzyme-to-json';
import ContentPlaceholder from '../ContentPlaceholder';

describe('<ContentPlaceholder> that renders a content placeholder', () => {
    it('should render default placeholder', () => {
        const wrapper = shallow(<ContentPlaceholder />);
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.props().style).toEqual({
            animationDuration: null,
            height: null
        });
        expect(wrapper.childAt(0).props().style).toBeNull();
    });

    it('should affect styles when props are changed', () => {
        const wrapper = shallow(<ContentPlaceholder duration={3} height={30} width={60} />);

        expect(wrapper.props().style).toEqual({
            animationDuration: '3s',
            height: 30
        });

        expect(wrapper.childAt(0).props().style).toEqual({
            width: '40%'
        });
    });
});
