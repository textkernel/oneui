import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { DatePicker, Text } from '@textkernel/oneui';

const YEARS: [number, number] = [2016, 2025];

storiesOf('Molecules|DatePicker', module)
    .addDecorator(withKnobs)
    .add(
        'DatePicker',
        () => {
            const [selected, setSelected] = React.useState(new Date());

            const handleChange = (date: Date) => {
                setSelected(date);
                console.log('new date selected: ', date);
            };

            return (
                <DatePicker
                    onChange={handleChange}
                    selected={selected}
                    yearsRange={YEARS}
                    todayButton="Today"
                    locale={text(
                        'Locale (for header area only, for localizing calendar, see library docs)',
                        'en'
                    )}
                />
            );
        },
        {
            info: {
                text: `
            ## Usage information

            This component is a thin wrapper around [react-datepicker](https://github.com/Hacker0x01/react-datepicker/), 
            only setting the header element and add css.

            You can pass other [props](https://github.com/Hacker0x01/react-datepicker/blob/master/docs/datepicker.md) according to their definition.
            See also [examples](https://reactdatepicker.com/) on their website. 
            `,
            },
        }
    )
    .add(
        'DateRangePicker',
        () => {
            const [startDate, setStartDate] = React.useState(new Date());
            const [endDate, setEndDate] = React.useState<Date | null>(null);

            const handleStartChange = (date: Date) => {
                setStartDate(date);
                if (endDate && date > endDate) {
                    setEndDate(null);
                }
                document.getElementById('range-end')?.focus();
            };

            const handleEndChange = (date: Date) => {
                setEndDate(date);
            };

            return (
                <>
                    <Text>Start date:</Text>
                    <DatePicker
                        id="range-start"
                        selected={startDate}
                        onChange={handleStartChange}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        yearsRange={YEARS}
                    />
                    <Text>End date:</Text>
                    <DatePicker
                        id="range-end"
                        selected={endDate}
                        onChange={handleEndChange}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        yearsRange={YEARS}
                    />
                </>
            );
        },
        {
            info: {
                text: `
        ## Example implementation

        This is an example on how to compose a range date picker using DatePicker component. 
        OneUI does not provide a ready component for it.

        __Note__: DatePicker is a thin wrapper around [react-datepicker](https://github.com/Hacker0x01/react-datepicker/). You can pass other [props](https://github.com/Hacker0x01/react-datepicker/blob/master/docs/datepicker.md) according to their definition.
        See also [examples](https://reactdatepicker.com/) on their website. 
        `,
            },
        }
    );
