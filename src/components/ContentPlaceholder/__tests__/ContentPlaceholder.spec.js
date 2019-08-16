import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import ContentPlaceholder from '../ContentPlaceholder';

describe('<ContentPlaceholder> that renders a content placeholder', () => {
    it('should render default placeholder', () => {
        const { container } = render(<ContentPlaceholder />);
        expect(container).toMatchSnapshot();
        expect(container).toHaveStyle(`
            animationDuration: '1s',
            height: null,
        `);
        expect(container.querySelector('.ContentPlaceholder__mask')).toHaveStyle(`
            width: '0%',
        `);
    });

    it('should affect styles when props are changed', () => {
        const { container } = render(
            <ContentPlaceholder duration={3} height={30} width={60} withoutMargin />
        );

        expect(container).toHaveStyle(`
            animationDuration: '3s',
            height: 30,
        `);

        expect(container.querySelector('.ContentPlaceholder__mask')).toHaveStyle(`
            width: '40%',
        `);

        expect(container.querySelector('.ContentPlaceholder--withoutMargin')).toBeVisible();
    });
});
