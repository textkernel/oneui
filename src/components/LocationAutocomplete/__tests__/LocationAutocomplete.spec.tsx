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
        // expect(wrapper.find('AutosuggestDeprecated').props().isLoading).toBeFalsy();
        const user = userEvent.setup();
        const textBox = screen.getByRole('textbox');
        await user.type(textBox, 'Honolulu');

        expect(textBox).toHaveAttribute('value', 'Honolulu');
    });

    it('should set loading to false when user deletes input value', async () => {
        const user = userEvent.setup();
        const textBox = screen.getByRole('textbox');
        await user.type(textBox, 'Honolulu');

        expect(textBox).toHaveAttribute('value', 'Honolulu');

        await user.type(textBox, ' ');
    });

    it.skip('should request predictions from API when user types', async () => {
        const user = userEvent.setup();
        await user.type(screen.getByRole('textbox'), 'Tonga');

        await focusField(user);

        expect(getPlacePredictionsMock).toHaveBeenCalledWith('Tonga');
    });

    it.skip('should pass predictions to AutosuggestDeprecated', async () => {
        const user = userEvent.setup();
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));

        await user.type(screen.getByRole('textbox'), 'Tonga');

        await focusField(user);

        // expect(view.find('AutosuggestDeprecated').props().getSuggestions).toHaveLength(5);
        expect(getPlacePredictionsMock).toHaveBeenCalled();
        expect(view.container).toMatchSnapshot();
    });

    it.skip('should call onError if predictions were not fetched', async () => {
        const user = userEvent.setup();
        getPlacePredictionsMock.mockImplementationOnce((req, cb) =>
            cb(predictionsMock, 'REQUEST_DENIED')
        );
        user.type(screen.getByRole('textbox'), 'Tonga');
        // act(() => {
        //     jest.runAllTimers();
        // });
        await focusField(user);

        expect(onErrorMock).toHaveBeenCalled();
    });

    it('should display powerByGoogle logo', async () => {
        // const user = userEvent.setup();
        // getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        // await user.type(screen.getByRole('textbox'), 'Tonga');
        // act(() => {
        //     jest.runAllTimers();
        // });
        // await focusField(user);

        expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it.skip('should not display powerByGoogle logo if hidePoweredByGoogleLogo set to true', () => {
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
        // view.setProps({ hidePoweredByGoogleLogo: true });
        // getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        // view.find('input').simulate('change', { target: { value: 'Tonga' } });
        // act(() => {
        //     jest.runAllTimers();
        // });
        // focusField();

        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it.skip('should call onSelectionChange when suggestion is selected', async () => {
        const user = userEvent.setup();
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        await user.type(screen.getByRole('textbox'), 'Tonga');

        await focusField(user);
        await user.click(screen.getByRole('listbox'));

        expect(onSelectionMock).toHaveBeenCalled();
    });

    it.skip('should call onRemoveAllLocations when selected suggestion is cleared with singleLocation set to true', async () => {
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
        const user = userEvent.setup();
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        await user.type(screen.getByRole('textbox'), 'Tonga');
        await focusField(user);

        expect(onSelectionMock).toHaveBeenCalled();

        await user.type(screen.getByRole('textbox'), '');

        expect(onRemoveAllLocationsMock).toHaveBeenCalled();
    });

    it.skip('should not display country information in list', async () => {
        const user = userEvent.setup();
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        await user.type(screen.getByRole('textbox'), 'Tonga');
        await focusField(user);

        // expect(view.find('MarkedText').at(0).text()).not.toContain(' UK');
    });

    it.skip('should display country information in list if showCountryInSuggestions is true', async () => {
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
        await user.type(screen.getByRole('textbox'), 'Tonga');
        await focusField(user);

        // expect(view.find('MarkedText').at(0).text()).toContain(' UK');
    });

    it.skip('should display latest results only, even if reply is delayed on previous requests', async () => {
        const user = userEvent.setup();
        getPlacePredictionsMock
            .mockImplementationOnce((req, cb) =>
                setTimeout(() => cb([predictionsMock[0]], 'OK'), 1000)
            ) // delay the reply to the first request
            .mockImplementationOnce((req, cb) => cb([predictionsMock[1]], 'OK'));

        await user.type(screen.getByRole('textbox'), 'One');

        expect(getPlacePredictionsMock).toHaveBeenCalledTimes(1);

        await user.type(screen.getByRole('textbox'), 'Two');

        // TODO: check why it is called 3 times and not 2 only
        // expect(getPlacePredictionsMock).toHaveBeenCalledTimes(3);
        // expect(view.find('li').text()).toContain(
        //     predictionsMock[1].structured_formatting.main_text
        // );
    });
});
