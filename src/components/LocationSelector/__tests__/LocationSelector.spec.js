import React from 'react';
import toJson from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import { stabGoogleApi, geocodeMock } from '../../../__mocks__/googleApiMock';
import geocodeResponse from '../../Map/__mocks__/geocodeResponse.json';
import { LocationSelector } from '..';

stabGoogleApi();

describe('LocationSelector component', () => {
    const selectedLocations = [
        {
            id: 'ajdo-219a-j19v-0491',
            description: 'Amsterdam',
            center: {
                lng: 4.894539799999961,
                lat: 52.3666969,
            },
            radius: 42,
            sliderLabel: '42km',
        },
        {
            id: 'ajdo-219a-j19v-0492',
            description: 'Utrecht',
            center: {
                lng: 5.121420100000023,
                lat: 52.09073739999999,
            },
            radius: 20,
            sliderLabel: '20km',
        },
    ];

    const minRadius = 1;
    const maxRadius = 100;
    const radiusStep = 1;
    const radiusDefaultValue = 2;
    const renderRadiusLabel = (r) => `+ ${r} km`;
    const country = 'NL';
    const placeTypes = ['(regions)'];

    const inputPlaceholder = 'inputPlaceholder';
    const noSuggestionsPlaceholder = 'noSuggestionsPlaceholder';
    const doneLabel = 'doneLabel';

    const onAddLocationMock = jest.fn();
    const onUpdateLocationMock = jest.fn();
    const onRemoveLocationMock = jest.fn();
    const onLocationAutocompleteErrorMock = jest.fn();

    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <LocationSelector
                apiKey="apiKey"
                language="en"
                radiusUnits="km"
                radiusDefaultValue={radiusDefaultValue}
                modalContentLabel="Location selection dialog"
                clearLabel="Clear"
                inputPlaceholder={inputPlaceholder}
                minRadius={minRadius}
                maxRadius={maxRadius}
                radiusStep={radiusStep}
                renderRadiusLabel={renderRadiusLabel}
                onRemoveLocation={onRemoveLocationMock}
                doneLabel={doneLabel}
                country={country}
                placeTypes={placeTypes}
                noSuggestionsPlaceholder={noSuggestionsPlaceholder}
                showCountryInSuggestions
                onLocationAutocompleteError={onLocationAutocompleteErrorMock}
                onUpdateLocation={onUpdateLocationMock}
                selectedLocations={selectedLocations}
                onAddLocation={onAddLocationMock}
                onRemoveAllLocations={jest.fn()}
            />
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render LocationSelector propertly when modal is closed', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render LocationSelector properly when modal is open', () => {
        wrapper.find('.FieldWrapper').simulate('mouseUp');
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should open and close modal when requested', () => {
        expect(wrapper.find('Modal').at(0).props().isOpen).toBeFalsy();

        wrapper.find('FieldWrapper').simulate('mouseUp');
        expect(wrapper.find('Modal').at(0).props().isOpen).toBeTruthy();

        // Since JSDom cannot click outside of component,
        // and because LocationSelectorDialog is not rendered due to LoadScriptNext not resolving
        // we hack the callback by calling it directly on Modal
        act(() => {
            wrapper.find('Modal').at(0).props().onRequestClose();
        });

        expect(wrapper.find('Modal').at(0).props().isOpen).toBeTruthy();
    });
    it('should add locations correctly', async () => {
        geocodeMock.mockImplementationOnce((req, cb) => {
            cb(geocodeResponse.results, geocodeResponse.status);
        });

        wrapper.find('FieldWrapper').simulate('mouseUp');

        // Since LocationSelectorDialog is not rendered due to LoadScriptNext not resolving
        // we hack the callback by calling it directly on LocationSelectorDialogWithGoogleLoader
        await wrapper
            .find('LocationSelectorDialogWithGoogleLoader')
            .props()
            .onAddLocation({ place_id: 'someId' });

        expect(onAddLocationMock).toHaveBeenCalledWith({
            center: { lat: 52.132633, lng: 5.291265999999999 },
            place_id: 'someId',
            radius: radiusDefaultValue,
        });
    });
    it('should get markers correctly', () => {
        const expectedResponse = selectedLocations.map((location) => ({
            center: {
                lat: location.center.lat,
                lng: location.center.lng,
            },
            description: location.description,
            radius: location.radius * 1000,
        }));
        wrapper.find('FieldWrapper').simulate('mouseUp');

        // Since LocationSelectorDialog is not rendered due to LoadScriptNext not resolving
        // we hack the callback by calling it directly on LocationSelectorDialogWithGoogleLoader
        expect(wrapper.find('LocationSelectorDialogWithGoogleLoader').props().getMarkers()).toEqual(
            expectedResponse
        );
    });
});
