import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Room} from './';
import { Reservation } from './reservation.model';

@model()
export class TimeSlot extends Entity {
  @property({
    type: 'string',
    id: true,
    mongodb: {dataType: 'ObjectID'},
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  label: string;

  @property({
    type: 'string',
    required: true,
  })
  value: string;

  @belongsTo(() => Reservation)
  reservationId: string;

  @belongsTo(() => Room)
  roomId: string;

  constructor(data?: Partial<TimeSlot>) {
    super(data);
  }
}

export interface TimeSlotRelations {
  // describe navigational properties here
}

export type TimeSlotWithRelations = TimeSlot & TimeSlotRelations;
