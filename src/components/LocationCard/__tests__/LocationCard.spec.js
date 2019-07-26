import React from 'react';
import toJson from 'enzyme-to-json';
import LocationCard from '../LocationCard';

describe('LocationCard component', () => {
    let wrapper;

    const mockOnDelete = jest.fn();

    beforeEach(() => {
        wrapper = mount(
            <LocationCard
                locationTitle="London"
                distanceRadius={42}
                sliderLabel="+42 km"
                minRadius={1}
                maxRadius={100}
                radiusStep={1}
                onDelete={mockOnDelete}
            />
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render component correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    describe('Callbacks', () => {
        it('should call onDelete callback', () => {
            expect(mockOnDelete).not.toHaveBeenCalled();

            wrapper.find('button').simulate('click');

            expect(mockOnDelete).toHaveBeenCalled();
        });
    });
});
