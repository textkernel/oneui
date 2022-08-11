import React from 'react';
import toJson from 'enzyme-to-json';
import { Teaser } from '../Teaser';

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
                statuses={[
                    {
                        label: 'Viewed',
                        tooltip: 'Viewed two days ago',
                    },
                    {
                        label: 'Imported',
                        tooltip: 'Imported five days ago',
                    },
                ]}
            />
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('Text').at(0).prop('context')).toEqual('brand');
        expect(wrapper.find('Text').at(2).prop('context')).toEqual('accent');
        expect(wrapper.find('Text').at(0).prop('title')).toEqual('A job title');
    });
    it('should render correctly in disabled mode', () => {
        const wrapper = mount(
            <Teaser
                title="A job title"
                location="location"
                subTitle="Organization"
                details="details about this job"
                disabled
            />
        );

        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('Text').at(0).prop('context')).toEqual('muted');
        expect(wrapper.find('Text').at(2).prop('context')).toEqual('muted');
    });
});
