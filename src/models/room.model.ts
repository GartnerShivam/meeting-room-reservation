import {Entity, model, property, hasMany} from '@loopback/repository';
import {Reservation} from './reservation.model';
import {TimeSlot} from './time-slot.model';

@model()
export class Room extends Entity {
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
  name: string;
  
  @property({
    type: 'string',
    required: true,
  })
  company: string;

  @hasMany(() => TimeSlot)
  timeSlots: TimeSlot[];

  @hasMany(() => Reservation)
  reservations: Reservation[];

  constructor(data?: Partial<Room>) {
    super(data);
  }
}


export interface RoomRelations {
  // describe navigational properties here
}

export type RoomWithRelations = Room & RoomRelations;
