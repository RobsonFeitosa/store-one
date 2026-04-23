import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm'
import type { Professional } from './Professional'

@Entity('pr100_time_intervals')
export class TimeIntervals {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: true })
  professional_id: string

  @ManyToOne('Professional', (professional: any) => professional.timeIntervals)
  @JoinColumn({ name: 'professional_id' })
  professional: Professional

  @Column()
  week_day: number

  @Column()
  time_start_in_minutes_one: number

  @Column()
  time_end_in_minutes_one: number

  @Column({ nullable: true })
  time_start_in_minutes_two?: number

  @Column({ nullable: true })
  time_end_in_minutes_two?: number
}

