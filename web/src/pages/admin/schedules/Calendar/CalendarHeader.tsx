import React from 'react'
import styles from './CalendarHeader.module.css'

const views = [
  { value: 'WEEK_TIME', label: 'Semana (tempo)' },
  { value: 'DAY', label: 'Dia' },
  { value: 'DAY_REVERSE', label: 'Dia reverso' },
  { value: 'MONTH', label: 'Mês' },
  { value: 'WEEK', label: 'Semana' },
  { value: 'WEEK_IN_PLACE', label: 'Semana in place' },
  { value: 'DAY_IN_PLACE', label: 'Dia in place' },
]

const days = [
  { value: 0, label: 'Domingo' },
  { value: 1, label: 'Segunda' },
  { value: 2, label: 'Terça' },
  { value: 3, label: 'Quarta' },
  { value: 4, label: 'Quinta' },
  { value: 5, label: 'Sexta' },
  { value: 6, label: 'Sábado' },
]

const timeDateFields = [
  { value: 'startTimeDate-endTimeDate', label: 'Início - Fim' },
  { value: 'createdAt-updatedAt', label: 'Criado - Atualizado' },
  { value: 'startTimeDate', label: 'Início' },
  { value: 'endTimeDate', label: 'Fim' },
]

interface CalendarHeaderProps {
  currentView: string
  weekStartsOn: number
  activeTimeDateField: string
  setCurrentView: (val: string) => void
  setWeekStartsOn: (val: number) => void
  setActiveTimeDateField: (val: string) => void
}

const CalendarHeader = ({
  currentView,
  weekStartsOn,
  activeTimeDateField,
  setCurrentView,
  setWeekStartsOn,
  setActiveTimeDateField,
}: CalendarHeaderProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="cal-view">Visualização</label>
        <select
          id="cal-view"
          className={styles.select}
          value={currentView}
          onChange={(e) => setCurrentView(e.target.value)}
        >
          {views.map((v) => (
            <option key={v.value} value={v.value}>{v.label}</option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="cal-week-start">Semana começa em</label>
        <select
          id="cal-week-start"
          className={styles.select}
          value={weekStartsOn}
          onChange={(e) => setWeekStartsOn(Number(e.target.value))}
        >
          {days.map((d) => (
            <option key={d.value} value={d.value}>{d.label}</option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="cal-time-field">Campo de data</label>
        <select
          id="cal-time-field"
          className={styles.select}
          value={activeTimeDateField}
          onChange={(e) => setActiveTimeDateField(e.target.value)}
        >
          {timeDateFields.map((f) => (
            <option key={f.value} value={f.value}>{f.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default CalendarHeader
