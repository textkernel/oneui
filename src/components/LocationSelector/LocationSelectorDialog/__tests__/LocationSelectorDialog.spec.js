import React from 'react';
import toJson from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import stabGoogleApi, { getPlacePredictionsMock } from '../../../../__mocks__/googleApiMock';
import predictionsMock from '../../../LocationAutocomplete/__mocks__/predictions.json';
import LocationSelectorDialog from '../LocationSelectorDialog';

stabGoogleApi();

describe('LocationSelectorDialog component', () => {
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
    const renderRadiusLabel = r => `+ ${r} km`;
    const country = 'NL';
    const placeTypes = ['(regions)'];

    const inputPlaceholder = 'inputPlaceholder';
    const noSuggestionsPlaceholder = 'noSuggestionsPlaceholder';
    const doneLabel = 'doneLabel';

    const onAddLocationMock = jest.fn();
    const onUpdateLocationMock = jest.fn();
    const onRemoveLocationMock = jest.fn();
    const onLocationAutocompleteErrorMock = jest.fn();
    const onCloseModal = jest.fn();

    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <LocationSelectorDialog
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
                getMarkers={() => []}
                onAddLocation={onAddLocationMock}
                onCloseModal={onCloseModal}
            />
        );
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render correctly', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should close LocationSelectorDialog by pressing on Done button', () => {
        wrapper.find('.Button').simulate('click');
        expect(onCloseModal).toHaveBeenCalledTimes(1);
    });
    it('should call onAddLocation by selecting an item from the autosuggestion list', () => {
        jest.useFakeTimers();
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        wrapper.find('input').simulate('change', { target: { value: 'Tonga' } });
        act(() => {
            jest.runAllTimers();
        });
        wrapper.find('input').simulate('click');

        expect(wrapper.find('Autosuggest').find('li')).toHaveLength(5);
        expect(onAddLocationMock).not.toHaveBeenCalled();

        wrapper
            .find('Autosuggest')
            .find('li')
            .at(0)
            .childAt(0)
            .simulate('click');

        expect(onAddLocationMock).toHaveBeenCalledTimes(1);
    });
    it('should call onRemoveLocation by clicking on Close button of the selected location item', () => {
        expect(onRemoveLocationMock).not.toHaveBeenCalled();

        wrapper
            .find('ul')
            .at(1)
            .childAt(0)
            .find('button')
            .simulate('click');

        expect(onRemoveLocationMock).toHaveBeenCalledTimes(1);
    });
    // TODO: Update test so slider handle would be reachable in order to update a LocationCard
    it.skip('should call onUpdateLocation by setting a new location radius valueof the selected location item', () => {
        expect(onUpdateLocationMock).not.toHaveBeenCalled();

        wrapper
            .find('ul')
            .at(1)
            .childAt(0)
            .find('div.rc-slider-handle')
            .simulate('mouseover')
            .simulate('mousedown')
            .simulate('mousemove')
            .simulate('mouseup');

        expect(onUpdateLocationMock).toHaveBeenCalled();
    });
});
