import React from 'react';
import toJson from 'enzyme-to-json';
import CandidateAvatar from '../CandidateAvatar';

describe('<CandidateAvatar> that renders a candidate profile image with match indication', () => {
    it('should render a default avatar', () => {
        const wrapper = shallow(<CandidateAvatar />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render a custom sized avatar with good match percentage', () => {
        const wrapper = shallow(<CandidateAvatar size={128} matchPercentage={67} />);
        expect(wrapper.props().style).toEqual({
            height: 128,
            width: 128
        });
        expect(wrapper.find('svg').props().style).toEqual({
            height: 128,
            width: 128
        });
        expect(wrapper.find('circle').props().strokeWidth).toBe(4);
        expect(wrapper.find('circle').props().cx).toBe(64);
        expect(wrapper.find('circle').props().cy).toBe(64);
    });

    it('should render an avatar with average match percentage', () => {
        const wrapper = shallow(<CandidateAvatar size={128} matchPercentage={34} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render an avatar with bad match percentage', () => {
        const wrapper = shallow(<CandidateAvatar size={128} matchPercentage={33} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should change avatar image', () => {
        const wrapper = shallow(<CandidateAvatar imageUrl="/candidate.jpg" />);
        expect(wrapper.find('.CandidateAvatar__image').props().style).toEqual({
            backgroundImage: 'url(/candidate.jpg)'
        });
    });

    it('should add classes when props are changed', () => {
        const wrapper = shallow(<CandidateAvatar showPercentageOnHover stroke="thin" />);
        expect(wrapper.find('.CandidateAvatar__percentage')).toHaveLength(1);
        expect(wrapper.find('circle').props().strokeWidth).toBe(2);
    });
});
