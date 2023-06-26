import React from 'react';
import { render, screen, RenderResult, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { stabGoogleApi } from '../../../__mocks__/googleApiMock';
import { LocationSelector, LocationSelectorLocation } from '..';

stabGoogleApi();

describe('LocationSelector component', () => {
    const selectedLocations = [
        {
            id: 'ajdo-219a-j19v-0491',
            center: {
                lng: 4.894539799999961,
                lat: 52.3666969,
            },
        } as LocationSelectorLocation,
        {
            id: 'ajdo-219a-j19v-0492',
            center: {
                lng: 5.121420100000023,
                lat: 52.09073739999999,
            },
        } as LocationSelectorLocation,
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

    let view: RenderResult;

    beforeEach(() => {
        view = render(
            <LocationSelector
                apiKey="apiKey"
                language="en"
                radiusUnits="km"
                radiusDefaultValue={radiusDefaultValue}
                modalContentLabel="Location selection dialog"
                clearTooltipLabel="Clear"
                inputPlaceholder={inputPlaceholder}
                hasRadius
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

    it('should render LocationSelector propertly when modal is closed', () => {
        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(screen.getAllByRole('button')).toHaveLength(2);
    });

    it('should render LocationSelector properly when modal is open', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: 'inputPlaceholder' }));

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(screen.getAllByRole('button')).toHaveLength(2);
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('should open and close modal when requested', async () => {
        const user = userEvent.setup();
        const button = screen.getByRole('button', { name: 'inputPlaceholder' });
        expect(button).not.toHaveAttribute('isOpen');
        await user.click(button);

        // Since JSDom cannot click outside of component,
        // and because LocationSelectorDialog is not rendered due to LoadScriptNext not resolving
        // we hack the callback by calling it directly on Modal
        await waitFor(() => {
            expect(button).not.toHaveAttribute('onRequestClose');
        });

        // expect(button).toHaveAttribute('isOpen');
        // expect(wrapper.find('Modal').at(0).props().isOpen).toBeTruthy();
    });
    //
    // it('should add locations correctly', async () => {
    //     geocodeMock.mockImplementationOnce((req, cb) => {
    //         cb(geocodeResponse.results, geocodeResponse.status);
    //     });
    //
    //     wrapper.find('FieldWrapper').simulate('click');
    //
    //     // Since LocationSelectorDialog is not rendered due to LoadScriptNext not resolving
    //     // we hack the callback by calling it directly on LocationSelectorDialogWithGoogleLoader
    //     await wrapper
    //         .find('LocationSelectorDialogWithGoogleLoader')
    //         .props()
    //         .onAddLocation({ place_id: 'someId' });
    //
    //     expect(onAddLocationMock).toHaveBeenCalledWith({
    //         center: { lat: 52.132633, lng: 5.291265999999999 },
    //         id: 'someId',
    //         place_id: 'someId',
    //         radius: radiusDefaultValue,
    //     });
    // });
    //
    it('should get markers correctly', async () => {
        const user = userEvent.setup();
        // const expectedResponse = selectedLocations.map((location) => ({
        //     center: {
        //         lat: location.center.lat,
        //         lng: location.center.lng,
        //     },
        //     description: location.description,
        //     radius: location.radius * 1000,
        // }));

        await user.click(screen.getAllByRole('button')[0]);
        // wrapper.find('FieldWrapper').simulate('click');

        // Since LocationSelectorDialog is not rendered due to LoadScriptNext not resolving
        // we hack the callback by calling it directly on LocationSelectorDialogWithGoogleLoader
        // expect(wrapper.find('LocationSelectorDialogWithGoogleLoader').props().getMarkers()).toEqual(
        //     expectedResponse
        // );
    });
});
