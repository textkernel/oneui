import * as React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from '../Card';

describe('Card', () => {
    const title =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit expedita labore laborum culpa harum incidunt.';
    const subtitle = 'Fugit expedita labore laborum culpa harum incidunt.';

    it('should render correctly', () => {
        const view = render(<Card title={title} subtitle={subtitle} trailing={1} />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
        expect(screen.getByText(subtitle)).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: '1' })).toBeInTheDocument();
    });

    it('should render Card only with the title', () => {
        const view = render(<Card title={title} />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
    });

    it('should render Card only with the title and trailing', () => {
        const view = render(<Card title={title} trailing="1" />);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('heading', { name: title })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: '1' })).toBeInTheDocument();
    });
});
