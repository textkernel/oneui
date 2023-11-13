import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '../Header';
import { IconTextkernel } from '../../Icon';

describe('Header component that renders a website header with a logo on the left and optional children on the right side', () => {
    it('should render correctly with simple logo image', () => {
        const view = render(
            <Header logo={{ src: 'jobfeed-logo.svg' }}>This is a placeholder for children</Header>
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });
    it('should render correctly with simple logo image as a link', () => {
        const view = render(
            <Header logo={{ src: 'jobfeed-logo.svg', link: '/' }}>
                This is a placeholder for children
            </Header>
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(screen.getByRole('link')).toBeInTheDocument();
    });
    it('should render correctly with logo passed as component', () => {
        const logo = (
            <a href="/test">
                <IconTextkernel aria-label="textkernel icon" />
            </a>
        );
        const view = render(<Header logo={logo}>This is a placeholder for children</Header>);
        const image = screen.getByRole('img');

        expect(view.container).toMatchSnapshot();
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('class', 'IconBase__svg');
        expect(screen.getByRole('link')).toBeInTheDocument();
    });
});
