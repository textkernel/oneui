import * as React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { CalendarHeader } from './CalendarHeader';
import 'react-datepicker/dist/react-datepicker.css?external'; // eslint-disable-line import/no-unresolved
import './DatePicker.css';

interface Props extends ReactDatePickerProps {
    /** the min and max year selectable by the user */
    yearsRange: [number, number];
}

export const DatePicker: React.FC<Props> = (props) => {
    const { children, yearsRange, locale, ...rest } = props;

    let localeStr;
    if (locale) {
        if (typeof locale === 'string') {
            localeStr = locale;
        } else {
            localeStr = locale.code;
        }
    }

    return (
        <ReactDatePicker
            {...rest}
            showPopperArrow={false}
            locale={locale}
            renderCustomHeader={(propsFromLib) => (
                <CalendarHeader {...propsFromLib} locale={localeStr} yearsRange={yearsRange} />
            )}
        >
            {children}
        </ReactDatePicker>
    );
};

DatePicker.displayName = 'DatePicker';
