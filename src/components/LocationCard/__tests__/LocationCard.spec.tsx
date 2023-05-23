import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { LocationCard } from '../LocationCard';

describe('LocationCard component', () => {
    let view: RenderResult;

    const mockOnDelete = jest.fn();

    beforeEach(() => {
        view = render(
            <LocationCard
                locationTitle="London"
                distanceRadius={42}
                sliderLabel="+42 km"
                minRadius={1}
                maxRadius={100}
                radiusStep={1}
                onDelete={mockOnDelete}
                hasRadius
            />
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render component correctly', () => {
        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.getByRole('slider')).toBeInTheDocument();
    });

    it('should render component correctly without radius slider', () => {
        view.rerender(
            <LocationCard
                locationTitle="London"
                distanceRadius={42}
                sliderLabel="+42 km"
                minRadius={1}
                maxRadius={100}
                radiusStep={1}
                onDelete={mockOnDelete}
                hasRadius={false}
            />
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    describe('Callbacks', () => {
        it('should call onDelete callback', async () => {
            const user = userEvent.setup();

            expect(mockOnDelete).not.toHaveBeenCalled();

            await user.click(screen.getByRole('button'));

            expect(mockOnDelete).toHaveBeenCalled();
        });
    });
});
