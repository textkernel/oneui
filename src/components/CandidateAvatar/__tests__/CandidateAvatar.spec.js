import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { render } from '@testing-library/react';
import CandidateAvatar from '../CandidateAvatar';

describe('<CandidateAvatar> that renders a candidate profile image with match indication', () => {
    it('should render a default avatar', () => {
        const { container } = render(<CandidateAvatar />);
        expect(container).toMatchSnapshot();
    });

    it('should render a custom sized avatar with good match percentage', () => {
        // Try odd size to see if it is forced to be even
        const { container } = render(<CandidateAvatar size={127} matchPercentage={100} />);
        expect(container.firstChild).toHaveStyle(`
            height: 128,
            width: 128,
        `);
        expect(container.querySelector('svg')).toHaveStyle(`
            height: 128,
            width: 128,
        `);
        expect(container.querySelector('circle')).toHaveAttribute('stroke-width', '4');
        expect(container.querySelector('circle')).toHaveAttribute('cx', '64');
        expect(container.querySelector('circle')).toHaveAttribute('cy', '64');
    });

    it('should render an avatar with average match percentage', () => {
        const { container } = render(<CandidateAvatar size={128} matchPercentage={34} />);
        expect(container).toMatchSnapshot();
    });

    it('should render an avatar with bad match percentage and avatar', () => {
        const { container } = render(
            <CandidateAvatar
                imageUrl="/candidate.jpg"
                size={128}
                matchPercentage={33}
                showPercentageOnHover
            />
        );
        expect(container).toMatchSnapshot();
    });

    it('should change avatar image', () => {
        const { container } = render(<CandidateAvatar imageUrl="/candidate.jpg" />);
        expect(container.querySelector('div.CandidateAvatar__image')).toHaveStyle(`
            backgroundImage: 'url(/candidate.jpg)',
        `);
    });

    it('should add classes when props are changed', () => {
        const { container, debug } = render(
            <CandidateAvatar showPercentageOnHover matchPercentage={10} size={58} />
        );
        debug();
        expect(container.querySelector('text')).toBeVisible();
        expect(container.querySelector('text').textContent).toBe('10%');
        expect(container.querySelector('circle')).toHaveAttribute('stroke-width', '2');
    });
});
