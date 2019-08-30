import React from 'react';
import toJson from 'enzyme-to-json';
import TwoPaneView from '../TwoPaneView';
import LeftPane from '../LeftPane';
import RightPane from '../RightPane';

// surpass errors from JSDom that is not there
global.console = { error: () => null };

describe('<TwoPaneView> that renders a two pane view', () => {
    it('should render correctly', () => {
        const wrapper = mount(
            <TwoPaneView>
                <LeftPane>Some content</LeftPane>
                <RightPane>Some content</RightPane>
            </TwoPaneView>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
