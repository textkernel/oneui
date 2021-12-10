import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { select, number, withKnobs } from '@storybook/addon-knobs';
import { DatePicker, Text } from '@textkernel/oneui';
import es from 'date-fns/locale/es';
import hu from 'date-fns/locale/hu';
import frCA from 'date-fns/locale/fr-CA';
import { registerLocale } from 'react-datepicker';

storiesOf('Molecules|DatePicker', module)
    .addDecorator(withKnobs)
    .add(
        'DatePicker',
        () => {
            registerLocale('es', es);
            registerLocale('hu', hu);
            registerLocale('fr-CA', frCA);

            const [selected, setSelected] = React.useState(new Date());

            const handleChange = (date: Date) => {
                setSelected(date);
                console.log('new date selected: ', date);
            };

            const minYear = number('Min year in the calendar header', 2016);
            const maxYear = number('Max year in the calendar header', 2025);

            return (
                <DatePicker
                    onChange={handleChange}
                    selected={selected}
                    yearsRange={[minYear, maxYear]}
                    todayButton="Today"
                    locale={select(
                        'Locale (see code example or lib docs for implementation details)',
                        ['en', 'es', 'hu', 'fr-CA'],
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

            const minYear = number('Min year in the calendar header', 2016);
            const maxYear = number('Max year in the calendar header', 2025);

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
                        yearsRange={[minYear, maxYear]}
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
                        yearsRange={[minYear, maxYear]}
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
