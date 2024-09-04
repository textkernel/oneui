import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
    initGoogleMapServices,
    convertCoordinatesIntoAddress,
    Input,
    Button,
} from '@textkernel/oneui';
import { ensureApiKey } from '../utils/ensureApiKey';

const columnStyle = {
    width: '30%',
    padding: '1em',
};

const meta: Meta<unknown> = {
    title: 'packages/LocationSelectorUtils',
};

export default meta;

type Story = StoryObj<unknown>;

export const ConvertCoordinatesIntoAddress: Story = {
    name: 'convertCoordinatesIntoAddress',
    args: {},
    parameters: {
        controls: { disable: true },
    },
    render: () => {
        const [lat, setLet] = React.useState(52.3675734); // Amsterdam lat
        const [lng, setLng] = React.useState(4.9041389); // Amsterdam lng
        const [address, setAddress] = React.useState({});
        const apiKey = ensureApiKey() || '';
        React.useEffect(() => {
            initGoogleMapServices({ apiKey });
        });
        const getAddress = async () => {
            setAddress({});
            const addressResponse = await convertCoordinatesIntoAddress({ lat, lng });
            setAddress(addressResponse);
        };
        return (
            <div style={{ display: 'flex' }}>
                <div style={columnStyle}>
                    <h3>Coordinates</h3>
                    <Input
                        value={lat}
                        type="number"
                        isBlock
                        onChange={(e) => setLet(parseFloat(e.target.value))}
                        placeholder="Enter Lat..."
                        size="small"
                    />
                    <Input
                        value={lng}
                        type="number"
                        isBlock
                        onChange={(e) => setLng(parseFloat(e.target.value))}
                        placeholder="Enter Lng..."
                        size="small"
                    />
                    <br />
                    <Button onClick={getAddress}>Get Address</Button>
                </div>
                <div style={columnStyle}>
                    <h3>Address</h3>
                    <pre>{JSON.stringify(address, null, 4)}</pre>
                </div>
            </div>
        );
    },
};
