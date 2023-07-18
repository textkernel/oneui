import React from 'react';
import { act } from 'react-dom/test-utils';
import toJson from 'enzyme-to-json';
import { stabGoogleApi, getPlacePredictionsMock } from '../../../__mocks__/googleApiMock';
import predictionsMock from '../__mocks__/predictions.json';
import { LocationAutocomplete } from '../LocationAutocomplete';

stabGoogleApi();

describe('<LocationAutocomplete/> that renders a location search field', () => {
    let wrapper;
    const onSelectionMock = jest.fn();
    const onErrorMock = jest.fn();
    const onRemoveAllLocationsMock = jest.fn();

    const focusField = () => wrapper.find('input').simulate('click');

    beforeEach(() => {
        wrapper = mount(
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
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should set loading to true when user starts typing', () => {
        expect(wrapper.find('Autosuggest').props().isLoading).toBeFalsy();
        wrapper.find('input').simulate('change', { target: { value: 'Honolulu' } });

        expect(wrapper.find('Autosuggest').props().isLoading).toBeTruthy();
    });
    it('should set loading to false when user deletes input value', () => {
        expect(wrapper.find('Autosuggest').props().isLoading).toBeFalsy();
        wrapper.find('input').simulate('change', { target: { value: 'Honolulu' } });

        expect(wrapper.find('Autosuggest').props().isLoading).toBeTruthy();

        wrapper.find('input').simulate('change', { target: { value: '' } });

        expect(wrapper.find('Autosuggest').props().isLoading).toBeFalsy();
    });
    it('should request predictions from API when user types', () => {
        wrapper.find('input').simulate('change', { target: { value: 'Tonga' } });
        act(() => {
            jest.runAllTimers();
        });
        focusField();

        expect(getPlacePredictionsMock).toHaveBeenCalledWith(
            expect.objectContaining({ input: 'Tonga' }),
            expect.any(Function)
        );
    });
    it('should pass predictions to AutosuggestDeprecated', () => {
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        wrapper.find('input').simulate('change', { target: { value: 'Tonga' } });
        act(() => {
            jest.runAllTimers();
        });
        focusField();

        expect(wrapper.find('Autosuggest').props().selectedSuggestions).toHaveLength(5);
        expect(getPlacePredictionsMock).toHaveBeenCalled();
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should call onError if predictions were not fetched', () => {
        getPlacePredictionsMock.mockImplementationOnce((req, cb) =>
            cb(predictionsMock, 'REQUEST_DENIED')
        );
        wrapper.find('input').simulate('change', { target: { value: 'Tonga' } });
        act(() => {
            jest.runAllTimers();
        });
        focusField();

        expect(onErrorMock).toHaveBeenCalled();
    });
    it('should display powerByGoogle logo', () => {
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        wrapper.find('input').simulate('change', { target: { value: 'Tonga' } });
        act(() => {
            jest.runAllTimers();
        });
        focusField();

        expect(wrapper.find('ul img')).toHaveLength(1);
    });
    it('should not display powerByGoogle logo if hidePoweredByGoogleLogo set to true', () => {
        wrapper.setProps({ hidePoweredByGoogleLogo: true });
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        wrapper.find('input').simulate('change', { target: { value: 'Tonga' } });
        act(() => {
            jest.runAllTimers();
        });
        focusField();

        expect(wrapper.find('ul img')).toHaveLength(0);
    });
    it('should call onSelectionChange when suggestion is selected', () => {
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        wrapper.find('input').simulate('change', { target: { value: 'Tonga' } });
        act(() => {
            jest.runAllTimers();
        });
        focusField();
        wrapper.find('li').at(0).children().simulate('click');

        expect(onSelectionMock).toHaveBeenCalled();
    });
    it('should call onRemoveAllLocations when selected suggestion is cleared with singleLocation set to true', () => {
        wrapper.setProps({ singleLocation: true });
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        wrapper.find('input').simulate('change', { target: { value: 'Tonga' } });
        act(() => {
            jest.runAllTimers();
        });
        focusField();
        wrapper.find('li').at(0).children().simulate('click');

        expect(onSelectionMock).toHaveBeenCalled();

        wrapper.find('input').simulate('change', { target: { value: '' } });

        expect(onRemoveAllLocationsMock).toHaveBeenCalled();
    });
    it('should not display country information in list', () => {
        expect(toJson(wrapper)).toMatchSnapshot();

        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        wrapper.find('input').simulate('change', { target: { value: 'Tonga' } });
        act(() => {
            jest.runAllTimers();
        });
        focusField();

        expect(wrapper.find('MarkedText').at(0).text()).not.toContain(' UK');
    });
    it('should display country information in list if showCountryInSuggestions is true', () => {
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        wrapper.setProps({ showCountryInSuggestions: true });
        wrapper.find('input').simulate('change', { target: { value: 'Tonga' } });
        act(() => {
            jest.runAllTimers();
        });
        focusField();

        expect(wrapper.find('MarkedText').at(0).text()).toContain(' UK');
    });
    it('should display latest results only, even if reply is delayed on previous requests', () => {
        getPlacePredictionsMock
            .mockImplementationOnce((req, cb) =>
                setTimeout(() => cb([predictionsMock[0]], 'OK'), 1000)
            ) // delay the reply to the first request
            .mockImplementationOnce((req, cb) => cb([predictionsMock[1]], 'OK'));

        wrapper.find('input').simulate('change', { target: { value: 'One' } });
        act(() => {
            jest.advanceTimersByTime(400);
        });

        expect(getPlacePredictionsMock).toHaveBeenCalledTimes(1);

        wrapper.find('input').simulate('change', { target: { value: 'Two' } });
        act(() => {
            jest.runAllTimers();
        });

        // TODO: check why it is called 3 times and not 2 only
        expect(getPlacePredictionsMock).toHaveBeenCalledTimes(3);
        expect(wrapper.find('li').text()).toContain(
            predictionsMock[1].structured_formatting.main_text
        );
    });
});
