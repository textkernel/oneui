import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LocationSelectorDialogWithGoogleLoader } from '..';

describe('<LocationSelectorDialogWithGoogleLoader/> that loads google api and renders a Location selector dialog', () => {
    it('should render with default props', () => {
        const view = render(
            <LocationSelectorDialogWithGoogleLoader
                apiKey="someKey"
                language="en"
                inputPlaceholder="Location"
                minRadius={1}
                maxRadius={100}
                radiusStep={5}
                renderRadiusLabel={jest.fn()}
                onRemoveLocation={jest.fn()}
                doneLabel="Done"
                country="NL"
                noSuggestionsPlaceholder="No suggestions"
                placeTypes={['(regions)']}
                onUpdateLocation={jest.fn()}
                selectedLocations={[]}
                getMarkers={() => []}
                onAddLocation={jest.fn()}
                onCloseModal={jest.fn()}
            />
        );

        expect(view.container).toMatchSnapshot();
        expect(screen.getByRole('status')).toBeInTheDocument();
    });
});
