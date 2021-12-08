import * as React from 'react';
import { ReactDatePickerCustomHeaderProps } from 'react-datepicker';
import { ImArrowLeft2, ImArrowRight2 } from 'react-icons/im';
import { bem } from '../../../utils';
import { Button } from '../../Buttons';
import { Text } from '../../Text';
import styles from './CalendarHeader.scss';

interface Props extends ReactDatePickerCustomHeaderProps {
    /** an array of the names of the month in the language you want to use */
    monthsNames: string[];
    /** an array of the years the user can choose from */
    years: number[];
}

const { block, elem } = bem('CalendarHeader', styles);

export const CalendarHeader: React.FC<Props> = (props) => {
    const {
        monthsNames,
        years,
        date,
        decreaseMonth,
        prevMonthButtonDisabled,
        increaseMonth,
        nextMonthButtonDisabled,
        changeYear,
    } = props;

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
                    {monthsNames[date.getMonth()]}
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
