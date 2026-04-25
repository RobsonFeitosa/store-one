import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptBrLocale from '@fullcalendar/core/locales/pt-br'

import { useGetAllSchedullings } from '@/pages/admin/hooks_generic/useGetAllSchedullings'
import FormDialog from './FormDialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface CalendarItem {
    id?: string
    title?: string | null
    startTimeDate?: string | null
    endTimeDate?: string | null
    customerName?: string | null
    professional?: string | null
    isPaid?: boolean
    bgColor?: string
    createdAt?: string | null
    updatedAt?: string | null
    [key: string]: unknown
}

const Calendar = () => {
    const { data: schedullingsResponse, refetch: getSchedullings } = useGetAllSchedullings()

    const [calendarData, setCalendarData] = React.useState<CalendarItem[]>([])
    const [open, setOpen] = React.useState(false)
    const [selectedItem, setSelectedItem] = React.useState<CalendarItem>({})

    React.useEffect(() => {
        getSchedullings()
    }, [getSchedullings])

    React.useEffect(() => {
        if (schedullingsResponse?.[0]) {
            setCalendarData(schedullingsResponse[0] as CalendarItem[])
        }
    }, [schedullingsResponse])

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
        <TooltipProvider delayDuration={300}>
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
                eventContent={(eventInfo) => {
                    const start = eventInfo.event.start
                    const end = eventInfo.event.end
                    const durationMs = (end?.getTime() ?? 0) - (start?.getTime() ?? 0)
                    const durationMin = durationMs / (1000 * 60)

                    return (
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div style={{ color: '#00000070', overflow: 'hidden', height: '100%', padding: '2px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '0.85em', display: 'flex', alignItems: 'center', justifyContent: 'space-between', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                                        <span style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                            {eventInfo.event.extendedProps.customerName || 'Sem cliente'}
                                        </span>
                                        {eventInfo.event.extendedProps.isPaid && (
                                            <span style={{ color: '#22c55e', fontSize: '1.2em', marginLeft: '4px' }} title="Pago">✓</span>
                                        )}
                                    </div>

                                    {durationMin > 30 && (
                                        <div style={{ fontSize: '0.75em', opacity: 0.9, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {eventInfo.event.title}
                                        </div>
                                    )}

                                    {durationMin > 60 && (
                                        <>
                                            <div style={{ fontSize: '0.7em', fontWeight: 500, color: '#3182ce', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                Profissional: {eventInfo.event.extendedProps.professional || 'Não definido'}
                                            </div>
                                            {!eventInfo.event.extendedProps.isPaid && (
                                                <div style={{ fontSize: '0.7em', color: '#ef4444', fontStyle: 'italic' }}>Pendente</div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </TooltipTrigger>
                            <TooltipContent className="p-3 bg-white border shadow-xl rounded-lg w-64 text-gray-800" side="right">
                                <div className="space-y-2">
                                    <div className="pb-2 border-b border-gray-100">
                                        <h4 className="font-bold text-sm text-gray-900 leading-none">
                                            {eventInfo.event.extendedProps.customerName || 'Sem cliente'}
                                        </h4>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex items-start gap-2 text-xs">
                                            <span className="font-semibold text-gray-500 w-20">Serviço:</span>
                                            <span className="text-gray-700 flex-1">{eventInfo.event.title || 'Sem título'}</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-xs">
                                            <span className="font-semibold text-gray-500 w-20">Profissional:</span>
                                            <span className="text-gray-700 flex-1">{eventInfo.event.extendedProps.professional || 'Não definido'}</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-xs">
                                            <span className="font-semibold text-gray-500 w-20">Pagamento:</span>
                                            <span className={eventInfo.event.extendedProps.isPaid ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                                                {eventInfo.event.extendedProps.isPaid ? "Confirmado (Pago) ✓" : "Pendente"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </TooltipContent>
                        </Tooltip>
                    )
                }}
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
        </TooltipProvider>
    )
}

export default Calendar
