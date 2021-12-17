import * as React from 'react';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im';
import { bem } from '../../../utils';
import { Button } from '../../Buttons';
import { Text } from '../../Text';
import styles from './CalendarHeader.scss';

interface Props extends ReactDatePickerCustomHeaderProps {
    /** the locale in which the names of the month should be displayed. Format should match Intl definitions */
    locale?: string;
    /** the min and max year selectable by the user */
    yearsRange: [number, number];
}

const { block, elem } = bem('CalendarHeader', styles);

export const CalendarHeader: React.FC<Props> = (props) => {
    const {
        locale = 'en',
        yearsRange,
        date,
        decreaseMonth,
        prevMonthButtonDisabled,
        increaseMonth,
        nextMonthButtonDisabled,
        changeYear,
    } = props;

    const monthName = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);

    const [minYear, maxYear] = yearsRange;
    if (maxYear < minYear) {
        console.error(
            `CalendarHeader component has received invalid props.
            Minimum selectable year (${minYear}) is larger then maximum selectable year (${maxYear})`
        );
        return null;
    }

    const yearsAvailable = maxYear - minYear + 1;
    const years = [...new Array(yearsAvailable)].map((val, idx) => minYear + idx);

    return (
        <div {...block()}>
            <Button
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                {...elem('navButton')}
            >
                <ImArrowLeft2 />
            </Button>
            <div role="presentation">
                <Text size="large" inline>
                    {monthName}
                </Text>
                <select
                    {...elem('select')}
                    value={date.getFullYear()}
                    onChange={({ target: { value } }) => changeYear(parseInt(value, 10))}
                >
                    {years.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            <Button
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                {...elem('navButton')}
            >
                <ImArrowRight2 />
            </Button>
        </div>
    );
};

CalendarHeader.displayName = 'CalendarHeader';
