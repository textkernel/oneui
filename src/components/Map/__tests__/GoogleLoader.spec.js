import React from 'react';
import toJson from 'enzyme-to-json';
import googleApi from '@react-google-maps/api';
import GoogleLoader from '../GoogleLoader';

const useLoadMock = jest.fn(() => ({ isLoaded: false, loadError: false }));
googleApi.useLoadScript = useLoadMock;

describe('<GoogleLoader> that wrapps a map and makes sure google API is loaded', () => {
    const API_KEY = 'AIzaSyA61aDjG48kvpwLhP-uE0sFSuHQ_j3EIwM';
    const mockErrorMessage = 'An error occured';
    it('should render a spinner while loading', () => {
        const wrapper = mount(
            <GoogleLoader loadErrorMessage={mockErrorMessage} apiKey={API_KEY}>
                <p>A map</p>
            </GoogleLoader>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(wrapper.find('LoadingSpinner')).toHaveLength(1);
    });
    it('should render correctly when finished loading', () => {
        useLoadMock.mockImplementationOnce(() => ({ isLoaded: true, loadError: false }));
        const wrapper = mount(
            <GoogleLoader loadErrorMessage={mockErrorMessage} apiKey={API_KEY}>
                <div>A map</div>
            </GoogleLoader>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should render error message if loading failed', () => {
        useLoadMock.mockImplementationOnce(() => ({ isLoaded: true, loadError: true }));
        const wrapper = mount(
            <GoogleLoader loadErrorMessage={mockErrorMessage} apiKey={API_KEY}>
                <div>A map</div>
            </GoogleLoader>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
