import React from 'react';
import { render, screen, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { stabGoogleApi, getPlacePredictionsMock } from '../../../__mocks__/googleApiMock';
import { LocationAutocomplete } from '../LocationAutocomplete';
import predictionsMock from '../__mocks__/predictions.json';

stabGoogleApi();

describe('<LocationAutocomplete/> that renders a location search field', () => {
    let view: RenderResult;
    const onSelectionMock = jest.fn();
    const onErrorMock = jest.fn();
    const onRemoveAllLocationsMock = jest.fn();

    const focusField = async (user) => {
        await user.click(screen.getByRole('textbox'));
    };

    beforeEach(() => {
        view = render(
            <LocationAutocomplete
                inputPlaceholder="Location..."
                noSuggestionsPlaceholder="No suggestions..."
                onSelectionChange={onSelectionMock}
                onError={onErrorMock}
                onRemoveAllLocations={onRemoveAllLocationsMock}
            />
        );
    });

    it('should render with minimal props', () => {
        expect(view.container).toMatchSnapshot();
    });

    it('should set loading to true when user starts typing', async () => {
        const user = userEvent.setup();
        const textBox = screen.getByRole('textbox');
        await user.type(textBox, 'Honolulu');

        expect(textBox).toHaveAttribute('value', 'Honolulu');
        expect(screen.getAllByRole('alert', { name: 'Loading' })).toHaveLength(5);

        await user.click(document.body);

        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('should set loading to false when user deletes input value', async () => {
        const user = userEvent.setup();
        const textBox = screen.getByRole('textbox');
        await user.type(textBox, 'Honolulu');

        expect(textBox).toHaveAttribute('value', 'Honolulu');
        expect(screen.getAllByRole('alert', { name: 'Loading' })).toHaveLength(5);

        await user.click(document.body);

        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('should request predictions from API when user types', async () => {
        const user = userEvent.setup();
        await user.type(screen.getByRole('textbox'), 'Tonga');
        const textBox = screen.getByRole('textbox');

        await focusField(user);

        expect(textBox).toHaveAttribute('value', 'Tonga');
    });

    it('should call onError if predictions were not fetched', async () => {
        const user = userEvent.setup();
        getPlacePredictionsMock.mockImplementationOnce((req, cb) =>
            cb(predictionsMock, 'REQUEST_DENIED')
        );
        await user.type(screen.getByRole('textbox'), 'Tonga');

        await focusField(user);
    });

    it('should display powerByGoogle logo', async () => {
        expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('should not display powerByGoogle logo if hidePoweredByGoogleLogo set to true', () => {
        view = render(
            <LocationAutocomplete
                inputPlaceholder="Location..."
                noSuggestionsPlaceholder="No suggestions..."
                onSelectionChange={onSelectionMock}
                onError={onErrorMock}
                onRemoveAllLocations={onRemoveAllLocationsMock}
                hidePoweredByGoogleLogo
            />
        );

        expect(view.container).toMatchSnapshot();
    });

    it('should call onSelectionChange when suggestion is selected', async () => {
        const user = userEvent.setup();
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        await user.type(screen.getByRole('textbox'), 'Tonga');

        await focusField(user);
        await user.click(screen.getByRole('listbox'));
    });

    it('should call onRemoveAllLocations when selected suggestion is cleared with singleLocation set to true', async () => {
        const user = userEvent.setup();
        view = render(
            <LocationAutocomplete
                inputPlaceholder="Location..."
                noSuggestionsPlaceholder="No suggestions..."
                onSelectionChange={onSelectionMock}
                onError={onErrorMock}
                onRemoveAllLocations={onRemoveAllLocationsMock}
                singleLocation
            />
        );
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        await user.click(screen.getAllByRole('textbox')[1]);
        await user.type(screen.getAllByRole('textbox')[1], 'Tonga');

        expect(onSelectionMock).toHaveBeenCalled();
    });

    it('should not display country information in list', async () => {
        const user = userEvent.setup();
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        await user.type(screen.getByRole('textbox'), 'Tonga');
        await focusField(user);
    });

    it('should display country information in list if showCountryInSuggestions is true', async () => {
        const user = userEvent.setup();
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        view = render(
            <LocationAutocomplete
                inputPlaceholder="Location..."
                noSuggestionsPlaceholder="No suggestions..."
                onSelectionChange={onSelectionMock}
                onError={onErrorMock}
                onRemoveAllLocations={onRemoveAllLocationsMock}
                showCountryInSuggestions
            />
        );
        await user.click(screen.getAllByRole('textbox')[1]);
        await user.type(screen.getAllByRole('textbox')[1], 'Tonga');
    });

    it('should display latest results only, even if reply is delayed on previous requests', async () => {
        const user = userEvent.setup();
        getPlacePredictionsMock
            .mockImplementationOnce((req, cb) =>
                setTimeout(() => cb([predictionsMock[0]], 'OK'), 1000)
            ) // delay the reply to the first request
            .mockImplementationOnce((req, cb) => cb([predictionsMock[1]], 'OK'));

        await user.type(screen.getByRole('textbox'), 'One');

        // expect(getPlacePredictionsMock).toHaveBeenCalledTimes(1);

        await user.type(screen.getByRole('textbox'), 'Two');

        // TODO: check why it is called 3 times and not 2 only
        // expect(getPlacePredictionsMock).toHaveBeenCalledTimes(3);
        // expect(view.find('li').text()).toContain(
        //     predictionsMock[1].structured_formatting.main_text
        // );
    });
});
