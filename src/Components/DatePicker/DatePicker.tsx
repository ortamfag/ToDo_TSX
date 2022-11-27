import React, { MouseEvent, ChangeEvent, useState, useEffect} from 'react'
import MonthDay from '../MonthDay/MonthDay';
import './DatePicker.scss'

interface Props {
    inputName: string;
    task?: string;
    deadline?: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    months: string[];
    todayDate: Date;
    dayOfDate: number;
    monthOfDate: number;
    yearOfDate: number;
}

function DatePicker({inputName, task, deadline, handleChange, months, todayDate, dayOfDate, monthOfDate, yearOfDate}: Props) {

    const [isDatesActive, setIsDatesActive] = useState<boolean>(false)

    //даты, которые выбираем тумблером
    const [selectedDate, setSelectedDate] = useState<Date>(todayDate)
    const [selectedDay, setSelectedDay] = useState<number>(dayOfDate)
    const [selectedMonth, setSelectedMonth] = useState<number>(monthOfDate)
    const [selectedYear, setSelectedYear] = useState<number>(yearOfDate)

    //даты тыканием
    const [deadlineDate, setDeadlineDate] = useState<Date>(todayDate)
    const [deadlineDay, setDeadlineDay] = useState<number>(dayOfDate)
    const [deadlineMonth, setDeadlineMonth] = useState<number>(monthOfDate)
    const [deadlineYear, setDeadlineYear] = useState<number>(yearOfDate)

    const [monthDays, setMonthDays] = useState<number[]>([])

    const [stateDay, setStateDay] = useState<number>(0) //костыль костылей

    const toggleDatePicker = (event: MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        if (String(event.currentTarget.classList) === 'datePicker') {
            setIsDatesActive(isDatesActive => !isDatesActive) 
        }
        createDays(selectedMonth + 1)
    }

    const createDays = (selectedMonth: number) => {
        let amountDays = 31;

        if (selectedMonth === 1) {
            amountDays = 28
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

    useEffect(() => {
        if (selectedDay !== stateDay) {
            setDeadlineDate(new Date(selectedYear + '-' + (selectedMonth + 1) + '-' + (selectedDay)))
            setStateDay(selectedDay)
        }
    })

    return (
        <div onClick={toggleDatePicker} className='datePicker'>
            <div className='datePicker_selected'>{formatDate(deadlineDate)}</div>

            <div onClick={toggleDatePicker} className={isDatesActive === true ? 'datePicker_dates datePicker_dates__active' : 'datePicker_dates'}>
                <div className='datePicker_dates__month'>
                    <div onClick={goToPrevMonth} className='datePicker_arrows prev-nth'>&lt;</div>
                    <div className='mth'>{`${months[selectedMonth]} ${' '} ${selectedYear}`}</div>
                    <div onClick={goToNextMonth} className='datePicker_arrows next-mth'>&gt;</div>
                </div>

                <div className='datePicker_dates__days'>
                    {monthDays.map((el: number, key: number) => {
                        return (
                            <MonthDay
                                el={el} 
                                key={key} 
                                monthOfDate={monthOfDate}
                                yearOfDate={yearOfDate}

                                selectedDay={selectedDay} 
                                selectedYear={selectedYear} 
                                selectedMonth={selectedMonth}

                                deadlineDay={deadlineDay} 
                                deadlineYear={deadlineYear} 
                                deadlineMonth={deadlineMonth}
                                newDeadlineDay={newDeadlineDay}/>
                        )
                    })}
                    
                </div>
            </div>
        </div>
  )
}

export default DatePicker