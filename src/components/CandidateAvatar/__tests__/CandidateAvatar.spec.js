import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CandidateAvatar } from '../CandidateAvatar';

describe('<CandidateAvatar> that renders a candidate profile image with match indication', () => {
    it('should render a default avatar', () => {
        const view = render(<CandidateAvatar />);

        expect(view.container).toMatchSnapshot();
    });

    it('should render a custom sized avatar with good match percentage', () => {
        // Try odd size to see if it is forced to be even
        const view = render(<CandidateAvatar size={127} matchPercentage={100} />);

        expect(view.container.firstChild).toHaveStyle({
            height: '128px',
            width: '128px',
        });
        expect(screen.getAllByRole('img')[1]).toHaveStyle({
            height: '128px',
            width: '128px',
        });
        const circle = screen.getByRole('progressbar');
        expect(circle).toHaveAttribute('stroke-width', '4');
        expect(circle).toHaveAttribute('cx', '64');
        expect(circle).toHaveAttribute('cy', '64');
    });

    it('should render an avatar with average match percentage', () => {
        const view = render(<CandidateAvatar size={128} matchPercentage={34} />);

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
        render(<CandidateAvatar imageUrl="/candidate.jpg" />);

        expect(screen.getAllByRole('img')[0]).toHaveStyle({
            backgroundImage: 'url(/candidate.jpg)',
        });
    });

    it('should add classes when props are changed', () => {
        render(<CandidateAvatar showPercentageOnHover matchPercentage={10} size={58} />);

        expect(screen.getByText('10%')).toBeInTheDocument('10%');
        expect(screen.getByRole('progressbar')).toHaveAttribute('stroke-width', '2');
    });
});
