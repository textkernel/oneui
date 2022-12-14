import * as React from 'react';
import { DatePicker, Text, Button } from '@textkernel/oneui';
import es from 'date-fns/locale/es';
import hu from 'date-fns/locale/hu';
import frCA from 'date-fns/locale/fr-CA';
import { registerLocale } from 'react-datepicker';

const DATE_REGEX = /\d\d\d\d-\d\d-\d\d/;

export default {
    title: 'Molecules/DatePicker',
    component: DatePicker,
    argTypes: {
        minDateStr: { control: 'text', description: 'Min date in  yyyy-MM-dd' },
        maxDateStr: { control: 'text', description: 'Max date in  yyyy-MM-dd' },
        locale: {
            options: ['en', 'es', 'hu', 'fr-CA'],
            control: { type: 'select' },
            description: 'Locale (see code example or lib docs for implementation details)',
        },
    },
};

registerLocale('es', es);
registerLocale('hu', hu);
registerLocale('fr-CA', frCA);

export const _DatePicker = (args) => {
    const [selected, setSelected] = React.useState(new Date());

    const handleChange = (date: Date) => {
        setSelected(date);
        console.log('new date selected: ', date);
    };

    let minDate;
    if (args.minDateStr.match(DATE_REGEX)) {
        minDate = new Date(args.minDateStr);
    }
    let maxDate;
    if (args.maxDateStr.match(DATE_REGEX)) {
        maxDate = new Date(args.maxDateStr);
    }

    // @ts-ignore
    return (
        <DatePicker
            onChange={handleChange}
            selected={selected}
            minDate={minDate}
            maxDate={maxDate}
            todayButton={<Button isLink>Today</Button>}
            locale={args.locale}
        />
    );
};
_DatePicker.args = {
    locale: 'en',
    minDateStr: '',
    maxDateStr: '',
};

export const _DateRangePicker = (args) => {
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState<Date | null>(null);

    let minDate;
    if (args.minDateStr.match(DATE_REGEX)) {
        minDate = new Date(args.minDateStr);
    }
    let maxDate;
    if (args.maxDateStr.match(DATE_REGEX)) {
        maxDate = new Date(args.maxDateStr);
    }

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
                minDate={minDate}
                maxDate={maxDate}
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
                maxDate={maxDate}
            />
        </>
    );
};
_DateRangePicker.args = {
    minDateStr: '',
    maxDateStr: '',
};
