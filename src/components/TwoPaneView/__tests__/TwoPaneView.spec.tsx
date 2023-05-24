import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { TwoPaneView } from '../TwoPaneView';
import { LeftPane } from '../LeftPane';
import { RightPane } from '../RightPane';

describe('<TwoPaneView> that renders a two pane view', () => {
    it('should render correctly', () => {
        const view = render(
            <TwoPaneView>
                <LeftPane>Some content</LeftPane>
                <RightPane>Some content</RightPane>
            </TwoPaneView>
        );

        expect(view.container).toMatchSnapshot();
    });
});
