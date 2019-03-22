import React from 'react';
import toJson from 'enzyme-to-json';
import JobResuts from '../JobResult';

describe('JobResuts', () => {
    it('should render correctly with just a title', () => {
        const wrapper = mount(<JobResuts title="some title" />);

        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render with all props defined', () => {
        const wrapper = mount(
            <JobResuts
                title="A job title"
                location="location"
                organization="Organization"
                details="details about this job"
            />
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
