import * as React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { CalendarHeader } from './CalendarHeader';
import 'react-datepicker/dist/react-datepicker.css?external'; // eslint-disable-line import/no-unresolved
import './DatePicker.css';

interface Props extends ReactDatePickerProps {
    /** Names of the months to be displayed in the header. January->December */
    months: string[];
    /** Years the user can select from */
    years: number[];
}

export const DatePicker: React.FC<Props> = (props) => {
    const { children, months, years, ...rest } = props;

    return (
        <ReactDatePicker
            {...rest}
            showPopperArrow={false}
            renderCustomHeader={(propsFromLib) => (
                <CalendarHeader {...propsFromLib} monthsNames={months} years={years} />
            )}
        >
            {children}
        </ReactDatePicker>
    );
};

DatePicker.displayName = 'DatePicker';
