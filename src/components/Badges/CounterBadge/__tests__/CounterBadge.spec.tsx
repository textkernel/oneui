import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CounterBadge } from '../CounterBadge';

describe('CounterBadge', () => {
    it('should render correctly', () => {
        const view = render(<CounterBadge>200k</CounterBadge>);

        expect(view.container).toMatchSnapshot();
        expect(screen.getByTitle('200k')).toBeInTheDocument();
        expect(screen.queryByTestId('arrow-upward')).not.toBeInTheDocument();
        expect(screen.queryByTestId('arrow-downward')).not.toBeInTheDocument();
    });

    it('should render with downward icon', () => {
        const view = render(
            <CounterBadge arrowDirection="down" arrowAriaLabel="down arrow">
                -1
            </CounterBadge>
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.getByTitle('-1')).toBeInTheDocument();
        expect(screen.getByLabelText('down arrow')).toBeInTheDocument();
    });

    it('should render with upward icon', () => {
        const view = render(
            <CounterBadge arrowDirection="up" arrowAriaLabel="up arrow">
                +1
            </CounterBadge>
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.getByTitle('+1')).toBeInTheDocument();
        expect(screen.getByLabelText('up arrow')).toBeInTheDocument();
    });
});
