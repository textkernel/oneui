import * as React from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { CalendarHeader } from './CalendarHeader';
import 'react-datepicker/dist/react-datepicker.css?external'; // eslint-disable-line import/no-unresolved
import './DatePicker.scss';

const DEFAULT_YEAR_RANGE = 100;

/**
 * ## Usage information
 * This component is a thin wrapper around [react-datepicker](https://github.com/Hacker0x01/react-datepicker/),
 * only setting the header element and add css.
 *
 * You can pass [props](https://github.com/Hacker0x01/react-datepicker/blob/master/docs/datepicker.md) according to their definition.
 * See also [examples](https://reactdatepicker.com/) on their website.
 */
export const DatePicker: React.FC<ReactDatePickerProps> = (props) => {
    const { children, minDate, maxDate, locale, ...rest } = props;

    const currentYear = new Date().getFullYear();
    const defaultMinDate = new Date();
    defaultMinDate.setFullYear(currentYear - DEFAULT_YEAR_RANGE);
    const defaultMaxDate = new Date();
    defaultMaxDate.setFullYear(currentYear + DEFAULT_YEAR_RANGE);

    const minYear = (minDate || defaultMinDate).getFullYear();
    const maxYear = (maxDate || defaultMaxDate).getFullYear();

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
            minDate={minDate || defaultMinDate}
            maxDate={maxDate || defaultMaxDate}
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
