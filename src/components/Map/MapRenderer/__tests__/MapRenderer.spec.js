import React from 'react';
import toJson from 'enzyme-to-json';
import stabGoogleApi, {
    fitBoundsMock,
    setZoomMock,
    setCenterMock,
} from '../../../../__mocks__/googleApiMock';
import MapRenderer from '../MapRenderer';

stabGoogleApi();

describe('<MapRendered/> that renders a Map with markers', () => {
    const regionMarker = {
        center: {
            lat: 52.3922288,
            lng: 4.9338793,
        },
        radius: 30000,
    };
    const pointMarker = {
        center: {
            lat: 52.5112671,
            lng: 7.2535521,
        },
    };

    it('should render with default props', () => {
        const wrapper = mount(<MapRenderer />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    it('should set center and zoom when rendered with default props', () => {
        mount(<MapRenderer />);
        // call on init Map and once onLoad
        expect(setZoomMock).toHaveBeenCalledTimes(2);
        expect(setCenterMock).toHaveBeenCalledTimes(2);
    });
    it('should render with markers', () => {
        const wrapper = mount(<MapRenderer markers={[pointMarker, regionMarker]} />);
        expect(wrapper.find('Marker')).toHaveLength(2);
        expect(wrapper.find('Circle')).toHaveLength(1);
    });
    it('should fit map to markers', () => {
        mount(<MapRenderer markers={[pointMarker, regionMarker]} />);
        // call fitBounds for each marker
        expect(fitBoundsMock).toHaveBeenCalledTimes(2);
    });
    it('should fit map when new marker is added', () => {
        const wrapper = mount(<MapRenderer markers={[pointMarker]} />);
        expect(fitBoundsMock).toHaveBeenCalledTimes(1);
        wrapper.setProps({ markers: [pointMarker, regionMarker] });
        // call count = original call + again for each marker
        expect(fitBoundsMock).toHaveBeenCalledTimes(3);
    });
    it('should fit to default center and zoom if markers removed', () => {
        const wrapper = mount(<MapRenderer markers={[pointMarker, regionMarker]} />);
        expect(setZoomMock).toHaveBeenCalledTimes(1);
        expect(setCenterMock).toHaveBeenCalledTimes(1);
        wrapper.setProps({ markers: [] });
        expect(setZoomMock).toHaveBeenCalledTimes(2);
        expect(setCenterMock).toHaveBeenCalledTimes(2);
    });
});
