import React from 'react';
import toJson from 'enzyme-to-json';
import { StickyHeader } from '..';

describe('StickyHeader component', () => {
    let wrapper;
    let consoleError;

    beforeEach(() => {
        consoleError = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render StickyHeader correctly', () => {
        wrapper = shallow(
            <StickyHeader>
                <div>I am a header</div>
            </StickyHeader>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(consoleError).not.toHaveBeenCalled();
    });

    it('should render StickyHeader with headerClassName', () => {
        wrapper = shallow(
            <StickyHeader className="my-sticky-class">
                <div>I am a header</div>
            </StickyHeader>
        );
        expect(wrapper.find('.StickyHeader').hasClass('my-sticky-class')).toBe(true);
    });
});
