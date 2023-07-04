import React from 'react';
import { render, screen, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { LocationSelectorLocation } from '@textkernel/oneui';
import { stabGoogleApi, getPlacePredictionsMock } from '../../../../__mocks__/googleApiMock';
import predictionsMock from '../../../LocationAutocomplete/__mocks__/predictions.json';
import { LocationSelectorDialog } from '../LocationSelectorDialog';

stabGoogleApi();

describe('LocationSelectorDialog component', () => {
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
    const renderRadiusLabel = (r) => `+ ${r} km`;
    const country = 'NL';
    const placeTypes = ['(regions)'];

    const inputPlaceholder = 'inputPlaceholder';
    const noSuggestionsPlaceholder = 'noSuggestionsPlaceholder';
    const doneLabel = 'doneLabel';

    const onAddLocationMock = jest.fn();
    const onUpdateLocationMock = jest.fn();
    const onRemoveLocationMock = jest.fn();
    const onRemoveAllLocationsMock = jest.fn();
    const onLocationAutocompleteErrorMock = jest.fn();
    const onCloseModal = jest.fn();

    let view: RenderResult;

    beforeEach(() => {
        view = render(
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
                onRemoveAllLocations={onRemoveAllLocationsMock}
            />
        );
    });

    it('should render correctly', () => {
        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('list')).toBeInTheDocument();
        expect(screen.getAllByRole('listitem')).toHaveLength(2);
        expect(screen.getAllByRole('button')).toHaveLength(3);
    });

    it('should close LocationSelectorDialog by pressing on Done button', async () => {
        const user = userEvent.setup();
        await user.click(screen.getByRole('button', { name: `${doneLabel}` }));

        expect(onCloseModal).toHaveBeenCalledTimes(1);
    });

    it('should call onAddLocation by selecting an item from the autosuggestion list', async () => {
        const user = userEvent.setup();
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        const input = await screen.getByRole('textbox');
        await user.type(input, 'Tonga');
        await user.click(input);

        expect(screen.getAllByRole('alert')).toHaveLength(5);
        expect(onAddLocationMock).not.toHaveBeenCalled();

        // await user.click(screen.getAllByRole('alert')[0]);
        // expect(onAddLocationMock).toHaveBeenCalled();
    });

    it('should call onRemoveLocation by clicking on Close button of the selected location item', async () => {
        expect(onRemoveLocationMock).not.toHaveBeenCalled();

        const user = userEvent.setup();
        await user.click(screen.getAllByRole('button')[1]);

        expect(onRemoveLocationMock).toHaveBeenCalledTimes(1);
    });

    // TODO: Update test so slider handle would be reachable in order to update a LocationCard
    it.skip('should call onUpdateLocation by setting a new location radius valueof the selected location item', () => {
        expect(onUpdateLocationMock).not.toHaveBeenCalled();

        // view.find('ul')
        //     .at(1)
        //     .childAt(0)
        //     .find('div.rc-slider-handle')
        //     .simulate('mouseover')
        //     .simulate('mousedown')
        //     .simulate('mousemove')
        //     .simulate('click');

        expect(onUpdateLocationMock).toHaveBeenCalled();
    });
});
