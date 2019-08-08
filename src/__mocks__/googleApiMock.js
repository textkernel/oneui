/* eslint-disable class-methods-use-this */
// This is an incolplete stubbing of google API, based on bits and pieces.
// Feel free to extend it as required.
const noop = () => {};
const EMPTY_OBJECT = {};
const EMPTY_CLASS = class {};

export const fitBoundsMock = jest.fn();
export const setZoomMock = jest.fn();
export const setCenterMock = jest.fn();
export const getPlacePredictionsMock = jest.fn();

export class Map {
    fitBounds() {
        fitBoundsMock();
    }

    getBounds() {}

    getCenter() {}

    getDiv() {}

    getHeading() {}

    getMapTypeId() {}

    getProjection() {}

    getStreetView() {}

    getTilt() {}

    getZoom() {}

    panBy() {}

    panTo() {}

    panToBounds() {}

    setCenter() {
        setCenterMock();
    }

    setHeading() {}

    setMapTypeId() {}

    setOptions() {}

    setStreetView() {}

    setTilt() {}

    setZoom() {
        setZoomMock();
    }

    controls = {};

    data = {
        add: noop,
        addGeoJson: noop,
        contains: noop,
        forEach: noop,
        getControlPosition: noop,
        getControls: noop,
        getDrawingMode: noop,
        getFeatureById: noop,
        getMap: noop,
        getStyle: noop,
        loadGeoJson: noop,
        overrideStyle: noop,
        remove: noop,
        revertStyle: noop,
        setControlPosition: noop,
        setControls: noop,
        setDrawingMode: noop,
        setMap: noop,
        setStyle: noop,
        toGeoJson: noop,
        controlPosition: EMPTY_OBJECT,
        controls: [],
    };

    mapTypes = {
        set: noop,
    };

    overlayMapTypes = {
        clear: noop,
        getArray: noop,
        getAt: noop,
        getLength: noop,
        insertAt: noop,
        pop: noop,
        push: noop,
        removeAt: noop,
        setAt: noop,
    };
}

export class Marker {
    getAnimation() {}

    getClickable() {}

    getCursor() {}

    getDraggable() {}

    getIcon() {}

    getLabel() {}

    getMap() {}

    getOpacity() {}

    getPosition() {}

    getShape() {}

    getTitle() {}

    getVisible() {}

    getZIndex() {}

    setAnimation() {}

    setClickable() {}

    setCursor() {}

    setDraggable() {}

    setIcon() {}

    setLabel() {}

    setMap() {}

    setOpacity() {}

    setOptions() {}

    setPosition() {}

    setShape() {}

    setTitle() {}

    setVisible() {}
}

export class LatLng {
    equals() {}

    lat() {}

    lng() {}

    toJSON() {}

    toString() {}

    toUrlValue() {}
}

export class LatLngBounds {
    contains() {}

    equals() {}

    extend() {}

    getCenter() {}

    getNorthEast() {}

    getSouthWest() {}

    intersects() {}

    isEmpty() {}

    toJSON() {}

    toSpan() {}

    toString() {}

    toUrlValue() {}

    union() {}
}

export class Circle {
    getBounds() {}

    getCenter() {}

    getDraggable() {}

    getEditable() {}

    getMap() {}

    getRadius() {}

    getVisible() {}

    setCenter() {}

    setDraggable() {}

    setEditable() {}

    setMap() {}

    setOptions() {}

    setRadius() {}

    setVisible() {}
}

export const google = {
    maps: {
        Animation: EMPTY_CLASS,
        Attribution: EMPTY_CLASS,
        BicyclingLayer: EMPTY_CLASS,
        Circle,
        ControlPosition: EMPTY_CLASS,
        Data: EMPTY_CLASS,
        DirectionsRenderer: EMPTY_CLASS,
        DirectionsService: EMPTY_CLASS,
        DirectionsStatus: EMPTY_CLASS,
        DistanceMatrixElementStatus: EMPTY_CLASS,
        DistanceMatrixService: EMPTY_CLASS,
        DistanceMatrixStatus: EMPTY_CLASS,
        ElevationService: EMPTY_CLASS,
        ElevationStatus: EMPTY_CLASS,
        FusionTablesLayer: EMPTY_CLASS,
        GeocoderLocationType: EMPTY_CLASS,
        GroundOverlay: EMPTY_CLASS,
        ImageMapType: EMPTY_CLASS,
        InfoWindow: EMPTY_CLASS,
        KmlLayer: EMPTY_CLASS,
        KmlLayerStatus: EMPTY_CLASS,
        LatLng,
        LatLngBounds,
        Map,
        Marker,
        MapTypeControlStyle: EMPTY_CLASS,
        MapTypeId: {
            HYBRID: '',
            ROADMAP: '',
            SATELLITE: '',
            TERRAIN: '',
        },
        MapTypeRegistry: EMPTY_CLASS,
        MarkerImage: EMPTY_CLASS,
        MarkerOptions: EMPTY_CLASS,
        MaxZoomService: EMPTY_CLASS,
        MaxZoomStatus: EMPTY_CLASS,
        MVCArray: EMPTY_CLASS,
        MVCObject: EMPTY_CLASS,
        NavigationControlStyle: EMPTY_CLASS,
        OverlayView: EMPTY_CLASS,
        Point: EMPTY_CLASS,
        Polygon: EMPTY_CLASS,
        Polyline: EMPTY_CLASS,
        Rectangle: EMPTY_CLASS,
        SaveWidget: EMPTY_CLASS,
        ScaleControlStyle: EMPTY_CLASS,
        Size: EMPTY_CLASS,
        StreetViewCoverageLayer: EMPTY_CLASS,
        StreetViewPanorama: EMPTY_CLASS,
        StreetViewService: EMPTY_CLASS,
        StreetViewStatus: EMPTY_CLASS,
        StrokePosition: EMPTY_CLASS,
        StyledMapType: EMPTY_CLASS,
        SymbolPath: EMPTY_CLASS,
        TrafficLayer: EMPTY_CLASS,
        TransitLayer: EMPTY_CLASS,
        TransitMode: EMPTY_CLASS,
        TransitRoutePreference: EMPTY_CLASS,
        TravelMode: EMPTY_CLASS,
        UnitSystem: EMPTY_CLASS,
        ZoomControlStyle: EMPTY_CLASS,

        places: {
            AutocompleteService: class {
                getPlacePredictions(req, cb) {
                    getPlacePredictionsMock(req, cb);
                }
            },
            PlacesServiceStatus: {
                INVALID_REQUEST: 'INVALID_REQUEST',
                NOT_FOUND: 'NOT_FOUND',
                OK: 'OK',
                OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
                REQUEST_DENIED: 'REQUEST_DENIED',
                UNKNOWN_ERROR: 'UNKNOWN_ERROR',
                ZERO_RESULTS: 'ZERO_RESULTS',
            },
            PlacesAutocomplete: {
                INVALID_REQUEST: 'INVALID_REQUEST',
                NOT_FOUND: 'NOT_FOUND',
                OK: 'OK',
                OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
                REQUEST_DENIED: 'REQUEST_DENIED',
                UNKNOWN_ERROR: 'UNKNOWN_ERROR',
                ZERO_RESULTS: 'ZERO_RESULTS',
            },
        },
        Geocoder: class {},
        GeocoderStatus: {
            ERROR: 'ERROR',
            INVALID_REQUEST: 'INVALID_REQUEST',
            OK: 'OK',
            OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
            REQUEST_DENIED: 'REQUEST_DENIED',
            UNKNOWN_ERROR: 'UNKNOWN_ERROR',
            ZERO_RESULTS: 'ZERO_RESULTS',
        },
    },
};

export default () => {
    global.window.google = google;
};
