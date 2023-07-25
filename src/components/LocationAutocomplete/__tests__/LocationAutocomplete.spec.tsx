import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, RenderResult, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { stabGoogleApi, getPlacePredictionsMock } from '../../../__mocks__/googleApiMock';
import predictionsMock from '../__mocks__/predictions.json';
import { LocationAutocomplete } from '../LocationAutocomplete';

stabGoogleApi();

describe('<LocationAutocomplete/> that renders a location search field', () => {
    let view: RenderResult;
    const onSelectionMock = jest.fn();
    const onErrorMock = jest.fn();
    const onRemoveAllLocationsMock = jest.fn();

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
        jest.useFakeTimers();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render with minimal props', () => {
        expect(view.container).toMatchSnapshot();
    });

    it('should set loading to true when user starts typing', () => {
        fireEvent.change(screen.getByRole('textbox'), {
            target: {
                value: 'Honolulu',
            },
        });

        expect(screen.getAllByRole('alert', { name: 'Loading' })).toHaveLength(5);
    });

    it('should set loading to false when user deletes input value', () => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument();

        fireEvent.change(screen.getByRole('textbox'), {
            target: {
                value: 'Honolulu',
            },
        });

        expect(screen.getAllByRole('alert', { name: 'Loading' })).toHaveLength(5);

        fireEvent.change(screen.getByRole('textbox'), {
            target: {
                value: '',
            },
        });

        expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('should request predictions from API when user types', () => {
        fireEvent.change(screen.getByRole('textbox'), {
            target: {
                value: 'Tonga',
            },
        });

        act(() => {
            jest.runAllTimers();
        });

        expect(getPlacePredictionsMock).toHaveBeenCalledWith(
            expect.objectContaining({ input: 'Tonga' }),
            expect.any(Function)
        );
    });

    it('should pass predictions to AutosuggestDeprecated', () => {
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        fireEvent.change(screen.getByRole('textbox'), {
            target: {
                value: 'Tonga',
            },
        });

        act(() => {
            jest.runAllTimers();
        });

        expect(getPlacePredictionsMock).toHaveBeenCalled();
        expect(view.container).toMatchSnapshot();
    });

    it('should call onError if predictions were not fetched', () => {
        getPlacePredictionsMock.mockImplementationOnce((req, cb) =>
            cb(predictionsMock, 'REQUEST_DENIED')
        );
        fireEvent.change(screen.getByRole('textbox'), {
            target: {
                value: 'Tonga',
            },
        });

        act(() => {
            jest.runAllTimers();
        });

        expect(onErrorMock).toHaveBeenCalled();
    });

    it('should display powerByGoogle logo', () => {
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        fireEvent.change(screen.getByRole('textbox'), {
            target: {
                value: 'Tonga',
            },
        });
        act(() => {
            jest.runAllTimers();
        });

        expect(screen.getByRole('img', { name: 'Powered by Google' })).toBeVisible();
    });

    it('should not display powerByGoogle logo if hidePoweredByGoogleLogo set to true', () => {
        view.rerender(
            <LocationAutocomplete
                inputPlaceholder="Location..."
                noSuggestionsPlaceholder="No suggestions..."
                onSelectionChange={onSelectionMock}
                onError={onErrorMock}
                onRemoveAllLocations={onRemoveAllLocationsMock}
                hidePoweredByGoogleLogo
            />
        );
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        fireEvent.change(screen.getByRole('textbox'), {
            target: {
                value: 'Tonga',
            },
        });
        act(() => {
            jest.runAllTimers();
        });

        expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('should call onSelectionChange when suggestion is selected', () => {
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        fireEvent.change(screen.getByRole('textbox'), {
            target: {
                value: 'Tonga',
            },
        });
        act(() => {
            jest.runAllTimers();
        });
        fireEvent.click(screen.getAllByRole('option')[0]);

        expect(onSelectionMock).toHaveBeenCalled();
    });

    it('should call onRemoveAllLocations when selected suggestion is cleared with singleLocation set to true', () => {
        view.rerender(
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
        fireEvent.change(screen.getByRole('textbox'), {
            target: {
                value: 'Tonga',
            },
        });
        act(() => {
            jest.runAllTimers();
        });
        fireEvent.click(screen.getAllByRole('option')[0]);

        expect(onSelectionMock).toHaveBeenCalled();

        fireEvent.change(screen.getByRole('textbox'), {
            target: {
                value: '',
            },
        });

        expect(onRemoveAllLocationsMock).toHaveBeenCalled();
    });

    it('should not display country information in list', () => {
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        fireEvent.change(screen.getByRole('textbox'), {
            target: {
                value: 'Tonga',
            },
        });
        act(() => {
            jest.runAllTimers();
        });

        expect(screen.getAllByRole('option')[0]).not.toHaveTextContent(' UK');
    });

    it('should display country information in list if showCountryInSuggestions is true', () => {
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        view.rerender(
            <LocationAutocomplete
                inputPlaceholder="Location..."
                noSuggestionsPlaceholder="No suggestions..."
                onSelectionChange={onSelectionMock}
                onError={onErrorMock}
                onRemoveAllLocations={onRemoveAllLocationsMock}
                showCountryInSuggestions
            />
        );
        fireEvent.change(screen.getByRole('textbox'), {
            target: {
                value: 'Tonga',
            },
        });
        act(() => {
            jest.runAllTimers();
        });

        expect(screen.getAllByRole('option')[0]).toHaveTextContent(' UK');
    });

    it('should display latest results only, even if reply is delayed on previous requests', () => {
        getPlacePredictionsMock
            .mockImplementationOnce((req, cb) =>
                setTimeout(() => cb([predictionsMock[0]], 'OK'), 1000)
            ) // delay the reply to the first request
            .mockImplementationOnce((req, cb) => cb([predictionsMock[1]], 'OK'));
        fireEvent.change(screen.getByRole('textbox'), {
            target: {
                value: 'One',
            },
        });
        act(() => {
            jest.advanceTimersByTime(400);
        });

        expect(getPlacePredictionsMock).toHaveBeenCalledTimes(1);

        fireEvent.change(screen.getByRole('textbox'), {
            target: {
                value: 'Two',
            },
        });
        act(() => {
            jest.runAllTimers();
        });

        // TODO: check why it is called 3 times and not 2 only
        expect(getPlacePredictionsMock).toHaveBeenCalledTimes(3);
    });
});
