import React from 'react';
import { act } from 'react-dom/test-utils';
import toJson from 'enzyme-to-json';
import stabGoogleApi, { getPlacePredictionsMock } from '../../../../__mocks__/googleApiMock';
import predictionsMock from '../../__mocks__/predictions.json';
import LocationAutocompleteRenderer from '../LocationAutocompleteRenderer';

stabGoogleApi();

describe('<LocationAutocompleteRenderer/> that renders a location search field', () => {
    let wrapper;
    const onSelectionMock = jest.fn();
    const onErrorMock = jest.fn();

    const focusField = () => wrapper.find('input').simulate('click');

    beforeEach(() => {
        wrapper = mount(
            <LocationAutocompleteRenderer
                inputPlaceholder="Location..."
                noSuggestionsPlaceholder="No suggestions..."
                onSelectionChange={onSelectionMock}
                onError={onErrorMock}
            />
        );
        jest.useFakeTimers();
    });

    afterEach(() => {
        // jest.runAllTimers();
        jest.resetAllMocks();
        // wrapper.unmount();
    });

    it('should render with minimal props', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should set loading to true when user starts typing', () => {
        expect(wrapper.find('Autosuggest').props().isLoading).toBeFalsy();
        // act(() => {
        wrapper.find('input').simulate('change', { target: { value: 'Honolulu' } });
        // });

        expect(wrapper.find('Autosuggest').props().isLoading).toBeTruthy();
    });
    it('should set loading to false when user deletes input value', () => {
        // act(() => {
        wrapper.find('input').simulate('change', { target: { value: '' } });
        // });

        expect(wrapper.find('Autosuggest').props().isLoading).toBeFalsy();
    });
    it('should request predictions from API when user types', () => {
        act(() => {
            wrapper.find('input').simulate('change', { target: { value: 'Tonga' } });
        });
        jest.runAllTimers();
        focusField();

        expect(getPlacePredictionsMock).toHaveBeenCalledWith(
            expect.objectContaining({ input: 'Tonga' }),
            expect.any(Function)
        );
    });
    it('should pass predictions to Autosuggest', () => {
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        act(() => {
            wrapper.find('input').simulate('change', { target: { value: 'Tonga' } });
        });
        jest.runAllTimers();
        focusField();

        expect(wrapper.find('Autosuggest').props().getSuggestions).toHaveLength(5);
        expect(getPlacePredictionsMock).toHaveBeenCalled();
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should call onError if predictions were not fetched', () => {
        getPlacePredictionsMock.mockImplementationOnce((req, cb) =>
            cb(predictionsMock, 'REQUEST_DENIED')
        );
        act(() => {
            wrapper.find('input').simulate('change', { target: { value: 'Tonga' } });
        });
        jest.runAllTimers();
        focusField();

        expect(onErrorMock).toHaveBeenCalled();
    });
    it('should call onSelectionChange when suggestion is selected', () => {
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        act(() => {
            wrapper.find('input').simulate('change', { target: { value: 'Tonga' } });
        });
        jest.runAllTimers();
        focusField();
        wrapper
            .find('li')
            .at(0)
            .children()
            .simulate('click');

        expect(onSelectionMock).toHaveBeenCalled();
    });
    it('should not display country information in list', () => {
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        act(() => {
            wrapper.find('input').simulate('change', { target: { value: 'Tonga' } });
        });
        jest.runAllTimers();
        focusField();

        expect(
            wrapper
                .find('MarkedText')
                .at(0)
                .text()
        ).not.toContain(' UK');
    });
    it('should display country information in list if showCountryInSuggestions is true', () => {
        getPlacePredictionsMock.mockImplementationOnce((req, cb) => cb(predictionsMock, 'OK'));
        wrapper.setProps({ showCountryInSuggestions: true });
        act(() => {
            wrapper.find('input').simulate('change', { target: { value: 'Tonga' } });
        });
        jest.runAllTimers();
        focusField();

        expect(
            wrapper
                .find('MarkedText')
                .at(0)
                .text()
        ).toContain(' UK');
    });
});
