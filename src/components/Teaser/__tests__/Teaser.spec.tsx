import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Teaser } from '../Teaser';
import { Text } from '../../Text';

describe('Teaser', () => {
    it('should render correctly with just a title', () => {
        const { container } = render(<Teaser title="some title" />);

        expect(container).toMatchSnapshot();
    });

    it('should render with all props defined', () => {
        const { container } = render(
            <Teaser
                title="A job title"
                location="location"
                subTitle="Organization"
                details="details about this job"
                statuses={[
                    {
                        label: 'Viewed',
                        tooltip: 'Viewed two days ago',
                    },
                    {
                        label: 'Imported',
                        tooltip: 'Imported five days ago',
                    },
                ]}
            />
        );

        expect(container).toMatchSnapshot();

        const title = screen.getByTitle('A job title');
        const location = screen.getByText('location');
        const subTitle = screen.getByText('Organization');
        const details = screen.getByText('details about this job');

        expect(title).toBeInTheDocument();
        expect(title).toHaveClass('Teaser__title');
        expect(title).not.toHaveClass('Text--context_neutral');

        expect(location).toBeInTheDocument();
        expect(location).toHaveClass('Text--context_neutral', 'Teaser__location');

        expect(subTitle).toBeInTheDocument();
        expect(subTitle).toHaveClass('Teaser__subTitle');
        expect(subTitle).not.toHaveClass('Text--context_neutral');

        expect(details).toBeInTheDocument();
        expect(details).toHaveClass('Text--context_neutral', 'Teaser__details');
    });

    it('should render correctly in disabled mode', () => {
        const { container } = render(
            <Teaser
                title="A job title"
                location="location"
                subTitle="Organization"
                details="details about this job"
                disabled
            />
        );

        expect(container).toMatchSnapshot();

        const title = screen.getByTitle('A job title');
        const location = screen.getByText('location');
        const subTitle = screen.getByText('Organization');
        const details = screen.getByText('details about this job');

        expect(title).toBeInTheDocument();
        expect(title).toHaveClass('Text--context_neutral', 'Teaser__title');

        expect(location).toBeInTheDocument();
        expect(location).toHaveClass('Text--context_neutral', 'Teaser__location');

        expect(subTitle).toBeInTheDocument();
        expect(subTitle).toHaveClass('Teaser__subTitle', 'Text--context_neutral');

        expect(details).toBeInTheDocument();
        expect(details).toHaveClass('Text--context_neutral', 'Teaser__details');
    });

    it('should add title attribute to title Text if the type is string', () => {
        render(<Teaser title="A job title" />);

        expect(screen.queryByTitle('A job title')).toBeInTheDocument();
    });

    it('should not add title attribute to title Text if the type is not string', () => {
        render(<Teaser title={<Text>A job title</Text>} />);

        expect(screen.queryByTitle('A job title')).not.toBeInTheDocument();
    });

    it('should add title attribute to subTitle Text if the type is string', () => {
        render(<Teaser title="A job title" subTitle="A subTitle" />);

        expect(screen.queryByTitle('A subTitle')).toBeInTheDocument();
    });

    it('should not add title attribute to subTitle Text if the type is not string', () => {
        render(<Teaser title="A job title" subTitle={<Text>A subTitle</Text>} />);

        expect(screen.queryByTitle('A subTitle')).not.toBeInTheDocument();
    });

    it('should add title attribute to details Text if the type is string', () => {
        render(<Teaser title="A job title" details="Details" />);

        expect(screen.queryByTitle('Details')).toBeInTheDocument();
    });

    it('should not add title attribute to details Text if the type is not string', () => {
        render(<Teaser title="A job title" details={<Text>Details</Text>} />);

        expect(screen.queryByTitle('Details')).not.toBeInTheDocument();
    });
});
