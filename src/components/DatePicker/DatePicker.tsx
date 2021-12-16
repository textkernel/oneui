import * as React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { CalendarHeader } from './CalendarHeader';
import 'react-datepicker/dist/react-datepicker.css?external'; // eslint-disable-line import/no-unresolved
import './DatePicker.scss';

const DEFAULT_YEAR_RANGE = 100;

export const DatePicker: React.FC<ReactDatePickerProps> = (props) => {
    const { children, minDate, maxDate, locale, ...rest } = props;

    let localeStr;
    if (locale) {
        if (typeof locale === 'string') {
            localeStr = locale;
        } else {
            localeStr = locale.code;
        }
    }

    const minYear = minDate ? minDate.getFullYear() : new Date().getFullYear() - DEFAULT_YEAR_RANGE;
    const maxYear = maxDate ? maxDate.getFullYear() : new Date().getFullYear() + DEFAULT_YEAR_RANGE;

    return (
        <ReactDatePicker
            {...rest}
            showPopperArrow={false}
            locale={locale}
            minDate={minDate}
            maxDate={maxDate}
            renderCustomHeader={(propsFromLib) => (
                <CalendarHeader
                    {...propsFromLib}
                    locale={localeStr}
                    yearsRange={[minYear, maxYear]}
                />
            )}
            autoComplete="off"
        >
            {children}
        </ReactDatePicker>
    );
};

DatePicker.displayName = 'DatePicker';
