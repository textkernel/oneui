import React from 'react';
import toJson from 'enzyme-to-json';
import { Tooltip } from '../Tooltip';

describe('<Tooltip> that renders a Tooltip', () => {
    it('should render default Tooltip correctly', () => {
        const wrapper = shallow(
            <Tooltip placement="bottom" content="content">
                Hover me
            </Tooltip>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
