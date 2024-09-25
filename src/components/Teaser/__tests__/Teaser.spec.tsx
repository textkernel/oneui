import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FaPlane } from 'react-icons/fa';
import { Teaser } from '../Teaser';
import { Tag } from '../../Tag';

describe('Teaser', () => {
    it('should render correctly with just a title', () => {
        const { container } = render(<Teaser title="some title" />);

        expect(screen.getByTitle('some title')).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    it('should render with all props defined', () => {
        const { container } = render(
            <Teaser
                title="A job title"
                subtitle="Organization"
                primaryInfo={{ text: 'Primary Info', href: 'https://textkernel.nl' }}
                secondaryInfo={{ text: 'Secondary Info' }}
                tercearyInfo={{ text: 'Terceary Info' }}
                sourceInfo={{ text: 'Source Info', icon: <FaPlane aria-label="plane" /> }}
                timestamp="Today"
                matchingIndicatorPercentage={50}
                tags={[
                    <Tag bgColor="yellow">First Tag</Tag>,
                    <Tag bgColor="lightblue">Second Tag</Tag>,
                ]}
                isVisited
                hasCheckbox
                isSelected
            />
        );

        expect(container).toMatchSnapshot();

        const title = screen.getByTitle('A job title');
        expect(title).toBeInTheDocument();
        expect(title).toHaveClass('Teaser__title');

        const subtitle = screen.getByTitle('Organization');
        expect(subtitle).toBeInTheDocument();
        expect(subtitle).toHaveClass('Teaser__subtitle');

        const primaryInfo = screen.getByRole('link', { name: 'Primary Info' });
        expect(primaryInfo).toBeInTheDocument();
        expect(primaryInfo).toHaveClass('Teaser__link');

        const secondaryInfo = screen.getByTitle('Secondary Info');
        expect(secondaryInfo).toBeInTheDocument();
        expect(secondaryInfo).toHaveClass('Teaser__info');

        const tercearyInfo = screen.getByTitle('Terceary Info');
        expect(tercearyInfo).toBeInTheDocument();
        expect(tercearyInfo).toHaveClass('Teaser__info');

        const sourceInfo = screen.getByTitle('Source Info');
        expect(sourceInfo).toBeInTheDocument();
        expect(sourceInfo).toHaveClass('Teaser__caption');
        expect(screen.getByLabelText('plane')).toBeInTheDocument();

        const timestamp = screen.getByTitle('Today');
        expect(timestamp).toBeInTheDocument();
        expect(timestamp).toHaveClass('Teaser__caption');

        const matchingIndicator = screen.getByLabelText('Matching indicator');
        expect(matchingIndicator).toBeInTheDocument();
        expect(matchingIndicator).toHaveClass('Teaser__matchIndicator');

        expect(screen.getByTitle('First Tag')).toBeInTheDocument();
        expect(screen.getByTitle('Second Tag')).toBeInTheDocument();

        expect(screen.getByLabelText('Visibility indicator')).toBeInTheDocument();

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toBeChecked();
    });

    it('should render checkbox not checked', () => {
        render(<Teaser title="some title" hasCheckbox isSelected={false} />);

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();
    });
});
