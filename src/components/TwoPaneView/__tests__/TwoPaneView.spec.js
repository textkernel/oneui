import React from 'react';
import toJson from 'enzyme-to-json';
import TwoPaneView from '../TwoPaneView';
import LeftPane from '../LeftPane';
import RightPane from '../RightPane';

// surpass errors from JSDom that is not there
// global.console = { error: () => null };

describe('<TwoPaneView> that renders a two pane view', () => {
    let consoleError;
    beforeEach(() => {
        consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should render correctly', () => {
        const wrapper = mount(
            <TwoPaneView>
                <LeftPane>Some content</LeftPane>
                <RightPane>Some content</RightPane>
            </TwoPaneView>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    describe('children prop validation', () => {
        it('should warn if no children are passed', () => {
            mount(<TwoPaneView />);
            expect(consoleError).toHaveBeenCalled();
            expect(consoleError.mock.calls[0][0]).toContain(
                'Failed prop type: The prop `children` is marked as required in `BlockWidthRestrictor`, but its value is'
            );
        });
        it('should warn if children are not RightPane or LeftPane', () => {
            mount(
                <TwoPaneView>
                    <div>some content</div>
                </TwoPaneView>
            );
            expect(consoleError).toHaveBeenCalled();
            expect(consoleError.mock.calls[0][0]).toContain(
                "'TwoPaneView' children should be of type 'RightPane' or 'LeftPane'."
            );
        });
    });
});
