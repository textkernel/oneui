import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MatchingIndicator } from '../MatchingIndicator';

describe('MatchingIndicator', () => {
    it('should render correctly', () => {
        const view = render(<MatchingIndicator percentage={75} aria-label="Matching indicator" />);
        expect(view.container).toMatchSnapshot();
    });

    it('should render nothing percentage is less than 0', () => {
        const view = render(<MatchingIndicator percentage={-1} />);
        expect(view.container).toBeEmptyDOMElement();
    });

    it('should render nothing percentage is more than 100', () => {
        const view = render(<MatchingIndicator percentage={101} />);
        expect(view.container).toBeEmptyDOMElement();
    });
});
