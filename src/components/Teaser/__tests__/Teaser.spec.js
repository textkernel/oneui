import React from 'react';
import toJson from 'enzyme-to-json';
import Teaser from '../Teaser';

describe('Teaser', () => {
    it('should render correctly with just a title', () => {
        const wrapper = mount(<Teaser title="some title" />);

        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render with all props defined', () => {
        const wrapper = mount(
            <Teaser
                title="A job title"
                location="location"
                subTitle="Organization"
                details="details about this job"
            />
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
