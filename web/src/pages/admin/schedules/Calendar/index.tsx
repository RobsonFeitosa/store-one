import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'

import { data as sampleData } from './data'
import FormDialog from './FormDialog'

interface CalendarItem {
    id?: string
    title?: string | null
    startTimeDate?: string | null
    endTimeDate?: string | null
    customerName?: string | null
    isPaid?: boolean
    bgColor?: string
    createdAt?: string | null
    updatedAt?: string | null
    [key: string]: unknown
}

const Calendar = () => {
    const [calendarData, setCalendarData] = React.useState<CalendarItem[]>(sampleData)
    const [open, setOpen] = React.useState(false)
    const [selectedItem, setSelectedItem] = React.useState<CalendarItem>({})

    React.useEffect(() => {
        if (!open) {
            setSelectedItem({})
        }
    }, [open])

    const onItemChange = (newItem: CalendarItem) => {
        setCalendarData((prev) =>
            prev.map((item) =>
                item.id === newItem.id
                    ? { ...newItem, updatedAt: new Date().toISOString() }
                    : item,
            ),
        )
    }

    const onItemCreate = (newItem: CalendarItem) => {
        setCalendarData((prev) => [...prev, newItem])
    }

    const events = calendarData.map((item) => ({
        id: item.id,
        title: item.title || '',
        start: item.startTimeDate || '',
        end: item.endTimeDate || '',
        backgroundColor: item.bgColor,
        extendedProps: { ...item },
    }))

    return (
        <div className="calendar-wrapper" style={{ background: '#fff', borderRadius: '8px' }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                locale={ptBrLocale}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                events={events}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={true}
                scrollTime="06:00:00"
                eventClick={(info) => {
                    setOpen(true)
                    setSelectedItem(info.event.extendedProps as CalendarItem)
                }}
                select={(selectInfo) => {
                    setOpen(true)
                    setSelectedItem({
                        title: null,
                        startTimeDate: selectInfo.startStr,
                        endTimeDate: selectInfo.endStr,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                    })
                }}
                height="800px"
                eventContent={(eventInfo) => (
                    <div style={{ color: '#00000070', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', padding: '2px', position: 'relative' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '0.85em', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span>{eventInfo.event.extendedProps.customerName || 'Sem cliente'}</span>
                            {eventInfo.event.extendedProps.isPaid && (
                                <span style={{ color: '#22c55e', fontSize: '1.2em' }} title="Pago">✓</span>
                            )}
                        </div>
                        <div style={{ fontSize: '0.75em', opacity: 0.9 }}>
                            {eventInfo.event.title}
                        </div>
                        {!eventInfo.event.extendedProps.isPaid && (
                            <div style={{ fontSize: '0.7em', color: '#ef4444', fontStyle: 'italic' }}>Pendente</div>
                        )}
                    </div>
                )}
            />
            <FormDialog
                open={open}
                setOpen={setOpen}
                isEdit={!!selectedItem?.id}
                selectedItem={selectedItem}
                onItemChange={onItemChange}
                onItemCreate={onItemCreate}
            />
        </div>
    )
}

export default Calendar
