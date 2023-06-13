import * as React from 'react';
import { GoogleMap, LoadScriptNext, LoadScriptNextProps } from '@react-google-maps/api';
import { LoadingSpinner } from '../../LoadingSpinner';
import { Map, MapProps } from '../Map';
/**
 * ## Note about props
 * `MapWithGoogleLoader` is a wrapper around the `Map` component, and it makes sure the Google API is loaded on the page.
 *
 * If you don't use `Map` directly.
 * `MapWithGoogleLoader` __will pass props__ that are not needed for loading the API __to `Map`__,
 * so you can provide them all together.
 */

export interface Props extends MapProps {
    /** Google API key */
    apiKey: string;
    /** Tha language code to be used for the map (e.g en). By default the users browser language will be used
     * For available values see: https://developers.google.com/maps/faq#languagesupport
     */
    language?: string;
    /** Regional setting for the map. By default Google uses US.
     * For details see: https://developers.google.com/maps/documentation/javascript/localization#Region
     */
    region?: string;
    /** other props to pass to the google loader. For details see: https://react-google-maps-api-docs.netlify.com/#loadscriptnext */
    additionalGoogleProps?: Omit<LoadScriptNextProps, 'googleMapsApiKey'>;
}
export const MapWithGoogleLoader = React.forwardRef<GoogleMap, Props>(
    ({ apiKey, language, region, additionalGoogleProps = {}, ...rest }, ref) => {
        return (
            <LoadScriptNext
                googleMapsApiKey={apiKey}
                language={language}
                region={region}
                loadingElement={<LoadingSpinner centerIn="parent" />}
                {...additionalGoogleProps}
            >
                <Map ref={ref} {...rest} />
            </LoadScriptNext>
        );
    }
);

MapWithGoogleLoader.displayName = 'MapWithGoogleLoader';
