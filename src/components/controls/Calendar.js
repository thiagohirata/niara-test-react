import React, { useState, useMemo, useRef, memo } from 'react'
import { hot } from 'react-hot-loader'
import { ptBR, enUS, es } from 'date-fns/locale'
import lastDayOfMonth from 'date-fns/lastDayOfMonth'
import parse from 'date-fns/parse'
import isValid from 'date-fns/isValid'
import format from 'date-fns/format'
import startOfMonth from 'date-fns/startOfMonth'
import getDate from 'date-fns/getDate'
import getDay from 'date-fns/getDay'
import addDays from 'date-fns/addDays'
import addMonths from 'date-fns/addMonths'
import isBefore from 'date-fns/isBefore'
import isAfter from 'date-fns/isAfter'

const LOCALES = {
    'pt-BR': ptBR,
    en: enUS,
    es: es,
}

// veja o que ocorre em datas no ano 0020 com o parseISO original
const parseISO = v => parse(v, 'yyyy-MM-dd', new Date())

const Calendar = props => {
    const { onValue, value, min: _min, max: _max, disabled } = props
    const locale = LOCALES[props.locale || 'pt-BR'] || ptBR

    const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()))
    const monthForward = e => {
        setCurrentMonth(m => addMonths(m, 1))
    }
    const monthBack = e => {
        setCurrentMonth(m => addMonths(m, -1))
    }
    const min = _min && parseISO(_min)
    const max = _max && parseISO(_max)
    useMemo(() => {
        const valueAsDate = value && parseISO(value)
        if (isValid(valueAsDate)) {
            setCurrentMonth(startOfMonth(valueAsDate))
        }
    }, [value])

    const isoDate = format(currentMonth, 'yyyy-MM-dd')

    return (
        <div className="devcase-calendar">
            <div className="devcase-calendar-header">
                <div className="devcase-calendar-month">
                    {currentMonth && format(currentMonth, 'MMMM yyyy', { locale })}
                </div>
                <div className="devcase-calendar-arrows">
                    {/* <button type="button" tabIndex="-1">
                        <i className="fas fa-caret-down"></i>
                        <span className="sr-only"></span>
                    </button> */}
                    <button type="button" onClick={monthBack} tabIndex="-1">
                        <i className="fas fa-chevron-left"></i>
                        <span className="sr-only"></span>
                    </button>
                    <button type="button" onClick={monthForward} tabIndex="-1">
                        <i className="fas fa-chevron-right"></i>
                        <span className="sr-only"></span>
                    </button>
                </div>
            </div>

            <MonthCalendar value={value} onValue={onValue} currentMonth={currentMonth} locale={locale} key={isoDate} min={min} max={max} disabled={disabled}/>
        </div>
    )
}

const DAYS_OF_WEEK = (() => {
    const a = []
    const exampleSunday = new Date(2019, 8, 8)
    for (let i = 0; i < 7; i++) {
        a.push(addDays(exampleSunday, i))
    }
    return a
})()

const MonthCalendar = memo(props => {
    const { currentMonth, value, onValue, locale, max, min, disabled } = props
    const daysCount = currentMonth && getDate(lastDayOfMonth(currentMonth))
    const days = useMemo(() => {
        const array = []
        if (daysCount && daysCount <= 31) {
            for (let i = 1; i <= daysCount; i++) {
                array.push(i)
            }
        }
        return array
    }, [daysCount])

    return (
        <div className="devcase-calendar-grid">
            {DAYS_OF_WEEK.map(d => format(d, 'EEEEEE', { locale })).map(dayOfWeek => (
                <div className="devcase-calendar-weekday" key={dayOfWeek}>
                    {dayOfWeek}
                </div>
            ))}
            {days.map(day => {
                const date = addDays(currentMonth, day - 1)
                const isoDate = format(date, 'yyyy-MM-dd')
                const isValue = value && value === isoDate
                const dayOfWeek = getDay(date)
                const dayDisabled = disabled || min && isBefore(date, min) || max && isAfter(date, max)
                return (
                    <div className={'devcase-calendar-cell ' + (day === 1 ? 'first-day-' + dayOfWeek : '')} key={isoDate}>
                        <button
                            className={'devcase-calendar-day ' + (isValue ? 'active' : '')}
                            type="button"
                            tabIndex="-1"
                            disabled={dayDisabled}
                            onClick={() => !dayDisabled && onValue(isoDate)}
                        >
                            {day}
                        </button>
                    </div>
                )
            })}
        </div>
    )
})

export default hot(module)(Calendar)
