import React from 'react'

interface Props {
    el: number;
    selectedDay: number;
    selectedYear: number;
    selectedMonth: number;
    monthOfDate: number;
    yearOfDate: number;
    deadlineDay: number;
    deadlineYear: number;
    deadlineMonth: number;

    newDeadlineDay: (el: number) => void
}

function MonthDay({el, selectedDay, selectedYear, selectedMonth, monthOfDate, yearOfDate, newDeadlineDay, deadlineDay, deadlineYear, deadlineMonth}: Props) {
    const detectSelected = (): string => {
        if (selectedDay === el && selectedMonth === deadlineMonth && selectedYear === deadlineYear) {
            return 'day selected'
        } else {
            return 'day'
        }
    }
  return (
    <div onClick={() => newDeadlineDay(el)} className={detectSelected()}>{el}</div>
  )
}

export default MonthDay