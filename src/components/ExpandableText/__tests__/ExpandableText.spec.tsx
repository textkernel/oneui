import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ExpandableText } from '../ExpandableText';

describe('<ExpandableText>', () => {
    const showMoreButtonLabel = 'Show more';
    const showLessButtonLabel = 'Show less';

    it('should render short text simply as is', () => {
        const { container } = render(
            <ExpandableText
                showLessButtonLabel={showLessButtonLabel}
                showMoreButtonLabel={showMoreButtonLabel}
            >
                some short text
            </ExpandableText>
        );

        expect(container).toMatchSnapshot();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
    // The following tests are not possible with JSDom because this doesn't actually render height
    it.todo('should render long text collapsed and with extend button');
    it.todo('should expand/collapse text on user interaction');
});
