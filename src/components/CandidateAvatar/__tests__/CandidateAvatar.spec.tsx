import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CandidateAvatar } from '../CandidateAvatar';

describe('<CandidateAvatar> that renders a candidate profile image with match indication', () => {
    it('should render a default avatar', () => {
        const view = render(<CandidateAvatar imageUrl="/candidate.jpg" matchPercentage={78} />);

        expect(view.container).toMatchSnapshot();
    });

    it('should render a custom sized avatar with good match percentage', () => {
        // Try odd size to see if it is forced to be even
        const view = render(
            <CandidateAvatar size={127} matchPercentage={100} imageUrl="/candidate.jpg" />
        );

        expect(view.container.firstChild).toHaveStyle({
            height: '128px',
            width: '128px',
        });
        expect(screen.getAllByRole('img')[1]).toHaveStyle({
            height: '128px',
            width: '128px',
        });
        const circle = screen.getByRole('meter');
        expect(circle).toHaveAttribute('stroke-width', '4');
        expect(circle).toHaveAttribute('cx', '64');
        expect(circle).toHaveAttribute('cy', '64');
    });

    it('should render an avatar with average match percentage', () => {
        const view = render(
            <CandidateAvatar size={128} matchPercentage={34} imageUrl="/candidate.jpg" />
        );

        expect(view.container).toMatchSnapshot();
    });

    it('should render an avatar with bad match percentage and avatar', () => {
        const view = render(
            <CandidateAvatar
                imageUrl="/candidate.jpg"
                size={128}
                matchPercentage={33}
                showPercentageOnHover
            />
        );

        expect(view.container).toMatchSnapshot();
    });

    it('should change avatar image', () => {
        render(<CandidateAvatar imageUrl="/candidate.jpg" matchPercentage={90} />);

        expect(screen.getAllByRole('img')[0]).toHaveStyle({
            backgroundImage: 'url(/candidate.jpg)',
        });
    });

    it('should add classes when props are changed', () => {
        render(
            <CandidateAvatar
                showPercentageOnHover
                matchPercentage={10}
                size={58}
                imageUrl="/candidate.jpg"
            />
        );

        expect(screen.getByText('10%')).toBeInTheDocument();
        expect(screen.getByRole('meter')).toHaveAttribute('stroke-width', '2');
    });
});
