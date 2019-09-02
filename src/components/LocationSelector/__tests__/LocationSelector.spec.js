import React from 'react';
import toJson from 'enzyme-to-json';
import LocationSelector from '../LocationSelector';

describe('LocationSelector component', () => {
    const selectedLocations = [];

    const onAddLocationMock = jest.fn();
    const onUpdateLocationMock = jest.fn();
    const onRemoveLocationMock = jest.fn();
    const onRemoveAllLocationsMock = jest.fn();
    const onBlurMock = jest.fn();

    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <LocationSelector
                apiKey="abc"
                selectedLocations={selectedLocations}
                country="NL"
                language="EN"
                radiusUnits="km"
                renderRadiusLabel={r => `+ ${r} km`}
                minRadius={1}
                maxRadius={100}
                radiusDefaultValue={1}
                radiusStep={1}
                placeTypes={['city']}
                showCountryInSuggestions
                modalContentLabel="Location selection dialog"
                inputPlaceholder="autocompletePlaceholder"
                noSuggestionsPlaceholder="noSuggestionsPlaceholder"
                selectionPlaceholder="selectionPlaceholder"
                doneLabel="doneLabel"
                clearLabel="clearLabel"
                onAddLocation={onAddLocationMock}
                onUpdateLocation={onUpdateLocationMock}
                onRemoveLocation={onRemoveLocationMock}
                onRemoveAllLocations={onRemoveAllLocationsMock}
                onBlur={onBlurMock}
            />
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should v', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('should render LocationSelector properly when modal is open', () => {
        // TODO: google call here so that LoadNext can display the actual content not just the loader
        wrapper.find('.FieldWrapper').simulate('click');
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
