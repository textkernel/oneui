import React from 'react';
import toJson from 'enzyme-to-json';
import CandidateAvatar from '../CandidateAvatar';

describe('<CandidateAvatar> that renders a candidate profile image with match indication', () => {
    it('should render a default avatar', () => {
        const wrapper = shallow(<CandidateAvatar />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render a custom sized avatar with good match percentage', () => {
        const wrapper = shallow(<CandidateAvatar size={128} percentage={67} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render an avatar with average match percentage', () => {
        const wrapper = shallow(<CandidateAvatar size={128} percentage={34} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render an avatar with bad match percentage', () => {
        const wrapper = shallow(<CandidateAvatar size={128} percentage={33} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should add classes when props are changed', () => {
        const wrapper = shallow(<CandidateAvatar showPercentageOnHover percentage={25} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
