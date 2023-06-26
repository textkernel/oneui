import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StickyHeader } from '..';

describe('StickyHeader component', () => {
    let view: RenderResult;

    it('should render StickyHeader correctly', () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementationOnce(() => {});
        view = render(
            <StickyHeader>
                <div>I am a header</div>
            </StickyHeader>
        );

        expect(view.container).toMatchSnapshot();
        expect(view.container).toHaveTextContent('I am a header');
        expect(consoleError).not.toHaveBeenCalled();
        expect(screen.getByRole('group')).toBeInTheDocument();
    });

    it('should render StickyHeader with headerClassName', () => {
        view = render(
            <StickyHeader className="my-sticky-class">
                <div>I am a header</div>
            </StickyHeader>
        );

        expect(screen.getByRole('group')).toHaveClass('my-sticky-class');
    });
});
