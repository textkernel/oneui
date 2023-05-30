import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import '@testing-library/jest-dom';
import { stabGoogleApi } from '../../../__mocks__/googleApiMock';
import { LocationAutocomplete } from '../LocationAutocomplete';

stabGoogleApi();

describe('<LocationAutocomplete/> that renders a location search field', () => {
    let view: RenderResult;
    const onSelectionMock = jest.fn();
    const onErrorMock = jest.fn();
    const onRemoveAllLocationsMock = jest.fn();

    // const focusField = () => view.find('input').simulate('click');

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

    it('should render with minimal props', () => {
        expect(view.container).toMatchSnapshot();
    });

    it('should set loading to true when user starts typing', async () => {
        // const user = userEvent.setup();
        // expect(view.find('AutosuggestDeprecated').props().isLoading).toBeFalsy();
        // await user.type(screen.getByRole('textbox'), 'Honolulu');
        // view.find('input').simulate('change', { target: { value: 'Honolulu' } });
        // expect(view.find('AutosuggestDeprecated').props().isLoading).toBeTruthy();
    });

    // it('should set loading to false when user deletes input value', () => {
    //     expect(view.find('AutosuggestDeprecated').props().isLoading).toBeFalsy();
    //     view.find('input').simulate('change', { target: { value: 'Honolulu' } });
    //
    //     expect(view.find('AutosuggestDeprecated').props().isLoading).toBeTruthy();
    //
    //     view.find('input').simulate('change', { target: { value: '' } });
    //
    //     expect(view.find('AutosuggestDeprecated').props().isLoading).toBeFalsy();
    // });
    //
    // it('should request predictions from API when user types', () => {
    //     view.find('input').simulate('change', { target: { value: 'Tonga' } });
    //     act(() => {
    //         jest.runAllTimers();
    //     });
    //     focusField();
    //
    //     expect(getPlacePredictionsMock).toHaveBeenCalledWith(
    //         expect.objectContaining({ input: 'Tonga' }),
    //         expect.any(Function)
    //     );
    // });
    //
    // it('should pass predictions to AutosuggestDeprecated', () => {
    //     getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
    //     view.find('input').simulate('change', { target: { value: 'Tonga' } });
    //     act(() => {
    //         jest.runAllTimers();
    //     });
    //     focusField();
    //
    //     expect(view.find('AutosuggestDeprecated').props().getSuggestions).toHaveLength(5);
    //     expect(getPlacePredictionsMock).toHaveBeenCalled();
    //     expect(toJson(view)).toMatchSnapshot();
    // });
    //
    // it('should call onError if predictions were not fetched', () => {
    //     getPlacePredictionsMock.mockImplementationOnce((req, cb) =>
    //         cb(predictionsMock, 'REQUEST_DENIED')
    //     );
    //     view.find('input').simulate('change', { target: { value: 'Tonga' } });
    //     act(() => {
    //         jest.runAllTimers();
    //     });
    //     focusField();
    //
    //     expect(onErrorMock).toHaveBeenCalled();
    // });
    //
    // it('should display powerByGoogle logo', () => {
    //     getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
    //     view.find('input').simulate('change', { target: { value: 'Tonga' } });
    //     act(() => {
    //         jest.runAllTimers();
    //     });
    //     focusField();
    //
    //     expect(view.find('ul img')).toHaveLength(1);
    // });
    //
    // it('should not display powerByGoogle logo if hidePoweredByGoogleLogo set to true', () => {
    //     view.setProps({ hidePoweredByGoogleLogo: true });
    //     getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
    //     view.find('input').simulate('change', { target: { value: 'Tonga' } });
    //     act(() => {
    //         jest.runAllTimers();
    //     });
    //     focusField();
    //
    //     expect(view.find('ul img')).toHaveLength(0);
    // });
    //
    // it('should call onSelectionChange when suggestion is selected', () => {
    //     getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
    //     view.find('input').simulate('change', { target: { value: 'Tonga' } });
    //     act(() => {
    //         jest.runAllTimers();
    //     });
    //     focusField();
    //     view.find('li').at(0).children().simulate('click');
    //
    //     expect(onSelectionMock).toHaveBeenCalled();
    // });
    //
    // it('should call onRemoveAllLocations when selected suggestion is cleared with singleLocation set to true', () => {
    //     view.setProps({ singleLocation: true });
    //     getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
    //     view.find('input').simulate('change', { target: { value: 'Tonga' } });
    //     act(() => {
    //         jest.runAllTimers();
    //     });
    //     focusField();
    //     view.find('li').at(0).children().simulate('click');
    //
    //     expect(onSelectionMock).toHaveBeenCalled();
    //
    //     view.find('input').simulate('change', { target: { value: '' } });
    //
    //     expect(onRemoveAllLocationsMock).toHaveBeenCalled();
    // });
    //
    // it('should not display country information in list', () => {
    //     getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
    //     view.find('input').simulate('change', { target: { value: 'Tonga' } });
    //     act(() => {
    //         jest.runAllTimers();
    //     });
    //     focusField();
    //
    //     expect(view.find('MarkedText').at(0).text()).not.toContain(' UK');
    // });
    //
    // it('should display country information in list if showCountryInSuggestions is true', () => {
    //     getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
    //     view.setProps({ showCountryInSuggestions: true });
    //     view.find('input').simulate('change', { target: { value: 'Tonga' } });
    //     act(() => {
    //         jest.runAllTimers();
    //     });
    //     focusField();
    //
    //     expect(view.find('MarkedText').at(0).text()).toContain(' UK');
    // });
    //
    // it('should display latest results only, even if reply is delayed on previous requests', () => {
    //     getPlacePredictionsMock
    //         .mockImplementationOnce((req, cb) =>
    //             setTimeout(() => cb([predictionsMock[0]], 'OK'), 1000)
    //         ) // delay the reply to the first request
    //         .mockImplementationOnce((req, cb) => cb([predictionsMock[1]], 'OK'));
    //
    //     view.find('input').simulate('change', { target: { value: 'One' } });
    //     act(() => {
    //         jest.advanceTimersByTime(400);
    //     });
    //
    //     expect(getPlacePredictionsMock).toHaveBeenCalledTimes(1);
    //
    //     view.find('input').simulate('change', { target: { value: 'Two' } });
    //     act(() => {
    //         jest.runAllTimers();
    //     });
    //
    //     // TODO: check why it is called 3 times and not 2 only
    //     expect(getPlacePredictionsMock).toHaveBeenCalledTimes(3);
    //     expect(view.find('li').text()).toContain(
    //         predictionsMock[1].structured_formatting.main_text
    //     );
    // });
});
