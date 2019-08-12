import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_LOCATION_CIRCLE_RADIUS = 20;

function LocationSelector(props) {
    /**
     * Stores an array of selected location objects
     *
     * locationShape = {
     *  id: PropTypes.string.isRequired,
     *  title: PropTypes.string.isRequired,
     *  coordinates: PropTypes.shapeOf({ lng: number, lan: number }).isRequired,
     *  radius: PropTypes.number.isRequired,
     * };
     */
    const [selectedLocations, setSelectedLocations] = React.useState([]);

    /** Add a new location to the selectedLocations array */
    function addLocation(location) {
        const coordinates = fetchPlaceInfo(location.id).coordinates;
        const locationToAdd = {
            ...location,
            coordinates,
            radius: DEFAULT_LOCATION_CIRCLE_RADIUS,
        };
        setSelectedLocations([...selectedLocations, locationToAdd]);
    }

    /** Update a selected location by id */
    function updateLocation(locationToUpdate) {
        const { id, ...rest } = locationToUpdate;

        const updatedSelectedLocations = selectedLocations.map(location => {
            if (location.id === id) {
                return { ...location, ...rest };
            }

            return location;
        });

        setSelectedLocations(updatedSelectedLocations);
    }

    /** Delete a selected location by id */
    function removeLocation(locationId) {
        setSelectedLocations(selectedLocations.filter(location => location.id !== locationId));
    }

    /** callback function for the Clear button click */
    function resetSelectedLocations() {
        setSelectedLocations([]);
    }

    return <div />;
}

LocationSelector.displayName = 'LocationSelector';

LocationSelector.propTypes = {
    /** country where search can take place */
    country: PropTypes.string.isRequired,
    /** locale code in which suggestions should be displayed */
    locale: PropTypes.string.isRequired,
    /** placeholder for LocationAutocomplete field */
    autocompletePlaceholder: PropTypes.string.isRequired,
    /** label for the Done button */
    doneLabel: PropTypes.string.isRequired,
    /** label to be used on the clear all button */
    removeAllLabel: PropTypes.string.isRequired,
    /** callback function for closed modal */
    onBlur: PropTypes.func,

};

LocationSelector.defaultProps = {
    onBlur: () => null,
};

export default LocationSelector;
