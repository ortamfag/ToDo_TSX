import React, { MouseEvent, ChangeEvent, useState, useEffect} from 'react'
import MonthDay from '../MonthDay/MonthDay';
import './DatePicker.scss'
import { deadlineSlice }  from '../../store/reducers/DeadlineSlice';
import { useAppDispatch } from '../../hooks/redux';

interface Props {
    months: string[];
    todayDate: Date;
    dayOfDate: number;
    monthOfDate: number;
    yearOfDate: number;
    updateDeadline: (value: Date) => void
}

function DatePicker({months, todayDate, dayOfDate, monthOfDate, yearOfDate, updateDeadline}: Props) {

    const { date } = deadlineSlice.actions
	const dispatch = useAppDispatch()

    const [isDatesActive, setIsDatesActive] = useState<boolean>(false)

    //просматриваемые даты
    const [selectedDay, setSelectedDay] = useState<number>(dayOfDate)
    const [selectedMonth, setSelectedMonth] = useState<number>(monthOfDate)
    const [selectedYear, setSelectedYear] = useState<number>(yearOfDate)

    //выбранные даты
    const [deadlineDate, setDeadlineDate] = useState<Date>(todayDate)
    const [deadlineDay, setDeadlineDay] = useState<number>(dayOfDate)
    const [deadlineMonth, setDeadlineMonth] = useState<number>(monthOfDate)
    const [deadlineYear, setDeadlineYear] = useState<number>(yearOfDate)

    const [monthDays, setMonthDays] = useState<number[]>([]) //массив с месяцами

    //костыли, чтобы юз эффект работал
    const [stateDay, setStateDay] = useState<number>(0)
    const [stateMonth, setStateMonth] = useState<number>(0)

    const toggleDatePicker = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        if (String(event.currentTarget.classList) === 'datePicker') { 
            setIsDatesActive(isDatesActive => !isDatesActive) 
        }
        createDays(selectedMonth + 1)
    }

    const createDays = (selectedMonth: number) => {
        let amountDays = 31;

        switch (selectedMonth) {
            case 2:
                amountDays = 28
                break
            case 4:
                amountDays = 30
                break
            case 6:
                amountDays = 30
                break
            case 9:
                amountDays = 30
                break
            case 11:
                amountDays = 30
                break
        }

        let daysInMonths: number[] = []
        
        for (let i = 0; i < amountDays; i++) {
            daysInMonths.push(i + 1)
        }

        setMonthDays([...daysInMonths])
    }

    const goToNextMonth = () => {
        setSelectedMonth(selectedMonth + 1)
        if (selectedMonth >= 11) {
            setSelectedMonth(0);
            setSelectedYear(selectedYear + 1);
        }
        createDays(selectedMonth + 1)
    }

    const goToPrevMonth = () => {
        setSelectedMonth(selectedMonth - 1)
        if (selectedMonth <= 0) {
            setSelectedMonth(11);
            setSelectedYear(selectedYear - 1);
        }
        createDays(selectedMonth + 1)
    }

    const formatDate = (date: Date) :string => {
        let day = date.getDate()
        if (day < 10) {
            day = Number('0' + day)
        }

        let month = date.getMonth() + 1
        if (month < 10) {
            month = Number('0' + month)
        }
        let year = date.getFullYear()

        return `${day} / ${month} / ${year}`
    }

    const newDeadlineDay = (el: number) => {
        setSelectedDay(el)
        setDeadlineDay(el)
        setDeadlineMonth(selectedMonth)
        setDeadlineYear(selectedYear)
    }

    const newDispatch = () => {
        dispatch(date(String(formatDate(deadlineDate))))
    }

    useEffect(() => {
        if (selectedDay !== stateDay) {
            setDeadlineDate(new Date(selectedYear + '-' + (selectedMonth + 1) + '-' + (selectedDay)))
            setStateDay(selectedDay)
        }

        if (selectedMonth !== stateMonth) {
            createDays(selectedMonth + 1)
            setStateMonth(selectedMonth)
        }

        newDispatch()
    })

    return (
        <div onClick={toggleDatePicker} className='datePicker'>
            <div className='datePicker_selected'>{formatDate(deadlineDate)}</div>

            <div onClick={toggleDatePicker} className={isDatesActive === true ? 'datePicker_dates datePicker_dates__active' : 'datePicker_dates'}>
                <div className='datePicker_dates__month'>
                    <div onClick={goToPrevMonth} className='datePicker_arrows prev-nth'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 19.5L7.5 12L15 4.5" stroke='white'/>
                        </svg>

                    </div>

                    <div className='mth'>{`${months[selectedMonth]} ${' '} ${selectedYear}`}</div>

                    <div onClick={goToNextMonth} className='datePicker_arrows next-mth'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 4.5L16.5 12L9 19.5" stroke='white'/>
                        </svg>
                    </div>
                </div>

                <div className='datePicker_dates__days'>
                    {monthDays.map((el: number, key: number) => {
                        return (
                            <MonthDay
                                el={el} 
                                key={key} 
                                selectedDay={selectedDay} 
                                selectedYear={selectedYear} 
                                selectedMonth={selectedMonth} 
                                deadlineYear={deadlineYear} 
                                deadlineMonth={deadlineMonth}
                                newDeadlineDay={newDeadlineDay}
                                />
                        )
                    })}
                    
                </div>
            </div>
        </div>
  )
}

export default DatePicker