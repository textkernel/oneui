import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ContentPlaceholder } from '../ContentPlaceholder';

describe('<ContentPlaceholder> that renders a content placeholder', () => {
    it('should render default placeholder', () => {
        const view = render(<ContentPlaceholder />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('alert')).toHaveStyle({
            animationDuration: '1s',
            height: undefined,
        });
        expect(screen.getByRole('presentation')).toHaveStyle({
            width: '0%',
        });
    });

    it('should affect styles when props are changed', () => {
        render(<ContentPlaceholder duration={3} height={30} width={60} withoutMargin />);

        expect(screen.getByRole('alert')).toHaveStyle({
            animationDuration: '3s',
            height: '30px',
        });
        expect(screen.getByRole('alert')).toHaveClass('ContentPlaceholder--withoutMargin');

        expect(screen.getByRole('presentation')).toHaveStyle({
            width: '40%',
        });
    });
});
