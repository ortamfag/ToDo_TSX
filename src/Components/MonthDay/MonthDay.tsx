import React from 'react';
import './MonthDay.scss';

interface Props {
    el: number;
    selectedDay: number;
    selectedYear: number;
    selectedMonth: number;
    deadlineYear: number;
    deadlineMonth: number;

    newDeadlineDay: (el: number) => void;
}

const MonthDay = ({
 el, selectedDay, selectedMonth, selectedYear, newDeadlineDay, deadlineYear, deadlineMonth,
}: Props) => {
    const detectSelected = (): string => {
        if (selectedDay === el && selectedMonth === deadlineMonth && selectedYear === deadlineYear) {
            return 'day selected';
        }
        return 'day';
    };
    return (
        <div onClick={() => newDeadlineDay(el)} className={detectSelected()}>
            <p>{el}</p>
        </div>
    );
};

export default MonthDay;
