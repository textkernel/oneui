import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TwoPaneView } from '../TwoPaneView';
import { LeftPane } from '../LeftPane';
import { RightPane } from '../RightPane';

describe('<TwoPaneView> that renders a two pane view', () => {
    it('should render correctly', () => {
        const view = render(
            <TwoPaneView>
                <LeftPane>Some content left pane</LeftPane>
                <RightPane>Some content right pane</RightPane>
            </TwoPaneView>
        );

        expect(view.container).toMatchSnapshot();
    });
});
