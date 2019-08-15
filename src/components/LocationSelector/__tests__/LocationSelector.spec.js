import React from 'react';
import LocationSelector from '../LocationSelector';

describe('LocationSelector component', () => {
    const selectedLocations = [];

    const onAddLocationMock = jest.fn();
    const onUpdateLocationMock = jest.fn();
    const onRemoveLocationMock = jest.fn();
    const onRemoveAllLocationsMock = jest.fn();

    function shallowLocationSelector() {
        return shallow(
            <LocationSelector
                apiKey="abc"
                selectedLocations={selectedLocations}
                country="NL"
                language="EN"
                radiusUnits="km"
                radiusUnitDisplayText="42"
                minRadius={1}
                maxRadius={100}
                radiusStep={1}
                autocompletePlaceholder="autocompletePlaceholder"
                noSuggestionsPlaceholder="noSuggestionsPlaceholder"
                selectionPlaceholder="selectionPlaceholder"
                mainPlaceholder="mainPlaceholder"
                doneLabel="doneLabel"
                clearLabel="clearLabel"
                contentLabel="contentLabel"
                onAddLocation={onAddLocationMock}
                onUpdateLocation={onUpdateLocationMock}
                onRemoveLocation={onRemoveLocationMock}
                onRemoveAllLocations={onRemoveAllLocationsMock}
            />
        );
    }

    it('should render LocationSelector properly', () => {
        const wrapper = shallowLocationSelector();
        expect(wrapper).toMatchSnapshot();
    });

    it.skip('should open modal window by clicking on the Text component', () => {
        const wrapper = shallowLocationSelector();
        expect(wrapper.find('.LocationSelector__autocomplete')).toHaveLength(0);
        wrapper.find('LocationSelector__mainTextInput').simulate('click');
        expect(wrapper.find('.LocationSelector__autocomplete')).toHaveLength(1);
    });
});
