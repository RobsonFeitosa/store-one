import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextInput } from '@lemonade-technologies-hub-ui/react'
import styles from './FormDialog.module.css'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button as ShadButton } from '@/components/ui/button'

const schema = z
    .object({
        title: z
            .string({ required_error: 'Título obrigatório' })
            .min(1, 'Título obrigatório')
            .max(40, 'Máximo de 40 caracteres'),
        customerName: z
            .string({ required_error: 'Nome do cliente obrigatório' })
            .min(1, 'Nome do cliente obrigatório')
            .max(40, 'Máximo de 40 caracteres'),
        startTimeDate: z.string().min(1, 'Data de início obrigatória'),
        endTimeDate: z.string().min(1, 'Data de fim obrigatória'),
        isPaid: z.boolean().optional(),
        bgColor: z.string().optional(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
    })
    .refine(
        (v) => !v.startTimeDate || !v.endTimeDate || v.startTimeDate <= v.endTimeDate,
        { message: 'O início não pode ser depois do fim', path: ['startTimeDate'] },
    )

type FormData = z.infer<typeof schema>

const colorOptions = [
    { value: '#bcdaff', label: 'Azul' },
    { value: 'rgb(247, 123, 123)', label: 'Vermelho' },
    { value: 'rgb(175, 235, 163)', label: 'Verde' },
    { value: '#ffe88f', label: 'Amarelo' },
]

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
}

interface FormDialogProps {
    open: boolean
    setOpen: (val: boolean) => void
    isEdit: boolean
    selectedItem: CalendarItem
    onItemChange: (item: CalendarItem) => void
    onItemCreate: (item: CalendarItem) => void
}

const toDatetimeLocal = (iso?: string | null) => {
    if (!iso) return ''
    try {
        const date = new Date(iso)
        if (isNaN(date.getTime())) return ''
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        return `${year}-${month}-${day}T${hours}:${minutes}`
    } catch {
        return ''
    }
}

const fromDatetimeLocal = (val: string) => {
    if (!val) return ''
    return new Date(val).toISOString()
}

export default function FormDialog({
    open,
    setOpen,
    isEdit,
    selectedItem,
    onItemChange,
    onItemCreate,
}: FormDialogProps) {
    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    })

    useEffect(() => {
        if (open) {
            reset({
                title: selectedItem.title ?? '',
                customerName: selectedItem.customerName ?? '',
                startTimeDate: toDatetimeLocal(selectedItem.startTimeDate),
                endTimeDate: toDatetimeLocal(selectedItem.endTimeDate),
                isPaid: selectedItem.isPaid ?? false,
                bgColor: selectedItem.bgColor ?? '#bcdaff',
                createdAt: toDatetimeLocal(selectedItem.createdAt),
                updatedAt: toDatetimeLocal(selectedItem.updatedAt),
            })
        }
    }, [open, selectedItem, reset])

    function onSubmit(data: FormData) {
        const item: CalendarItem = {
            ...selectedItem,
            title: data.title,
            startTimeDate: fromDatetimeLocal(data.startTimeDate),
            endTimeDate: fromDatetimeLocal(data.endTimeDate),
            customerName: data.customerName,
            isPaid: data.isPaid,
            bgColor: data.bgColor,
            updatedAt: new Date().toISOString(),
        }
        if (isEdit) {
            onItemChange(item)
        } else {
            onItemCreate({ ...item, id: String(Math.random() * 1e9 | 0) })
        }
        setOpen(false)
    }

    if (!open) return null

    return (
        <div className={styles.overlay} onClick={() => setOpen(false)}>
            <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>
                        {isEdit ? 'Editar agendamento' : 'Novo agendamento'}
                    </h2>
                    <button className={styles.closeBtn} onClick={() => setOpen(false)}>✕</button>
                </div>

                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.field}>
                        <TextInput
                            id="cal-title"
                            placeholder="Título"
                            {...register('title')}
                            error={errors.title?.message}
                        />
                    </div>

                    <div className={styles.field}>
                        <TextInput
                            id="cal-customer"
                            placeholder="Nome do cliente"
                            {...register('customerName')}
                            error={errors.customerName?.message}
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="cal-start">Início</label>
                            <input
                                id="cal-start"
                                type="datetime-local"
                                className={`${styles.dateInput} ${errors.startTimeDate ? styles.inputError : ''}`}
                                {...register('startTimeDate')}
                            />
                            {errors.startTimeDate && (
                                <span className={styles.error}>{errors.startTimeDate.message}</span>
                            )}
                        </div>

                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="cal-end">Fim</label>
                            <input
                                id="cal-end"
                                type="datetime-local"
                                className={`${styles.dateInput} ${errors.endTimeDate ? styles.inputError : ''}`}
                                {...register('endTimeDate')}
                            />
                            {errors.endTimeDate && (
                                <span className={styles.error}>{errors.endTimeDate.message}</span>
                            )}
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Status do Pagamento</label>
                        <Controller
                            control={control}
                            name="isPaid"
                            render={({ field }) => (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <div 
                                            className={`${styles.dateInput} cursor-pointer flex items-center gap-2`}
                                            style={{ color: field.value ? '#22c55e' : '#ef4444', height: '40px' }}
                                        >
                                            {field.value ? (
                                                <>
                                                    <span style={{ fontSize: '1.2em', fontWeight: 'bold' }}>✓</span>
                                                    <span>Pago (pelo sistema)</span>
                                                </>
                                            ) : (
                                                <span style={{ fontStyle: 'italic' }}>Pagamento Pendente</span>
                                            )}
                                        </div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-56 p-2 bg-white border border-gray-200 rounded-lg shadow-lg">
                                        <div className="flex flex-col gap-1">
                                            <ShadButton
                                                type="button"
                                                variant="ghost"
                                                className="justify-start text-green-600 hover:bg-green-50"
                                                onClick={() => field.onChange(true)}
                                            >
                                                ✓ Marcar como Pago
                                            </ShadButton>
                                            <ShadButton
                                                type="button"
                                                variant="ghost"
                                                className="justify-start text-red-600 hover:bg-red-50"
                                                onClick={() => field.onChange(false)}
                                            >
                                                ✕ Marcar como Pendente
                                            </ShadButton>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )}
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="cal-color">Cor</label>
                        <Controller
                            control={control}
                            name="bgColor"
                            render={({ field }) => (
                                <div className={styles.colorGrid}>
                                    {colorOptions.map((opt) => (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            title={opt.label}
                                            className={`${styles.colorSwatch} ${field.value === opt.value ? styles.colorSwatchActive : ''}`}
                                            style={{ backgroundColor: opt.value }}
                                            onClick={() => field.onChange(opt.value)}
                                        />
                                    ))}
                                </div>
                            )}
                        />
                    </div>

                    {isEdit && (
                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="cal-created">Criado em</label>
                                <input
                                    id="cal-created"
                                    type="datetime-local"
                                    className={styles.dateInput}
                                    disabled
                                    {...register('createdAt')}
                                />
                            </div>
                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="cal-updated">Atualizado em</label>
                                <input
                                    id="cal-updated"
                                    type="datetime-local"
                                    className={styles.dateInput}
                                    disabled
                                    {...register('updatedAt')}
                                />
                            </div>
                        </div>
                    )}

                    <div className={styles.actions}>
                        <Button type="button" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isSubmitting}>
                            {isEdit ? 'Salvar' : 'Criar'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
