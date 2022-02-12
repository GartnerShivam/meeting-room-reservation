import {Entity, model, property, belongsTo, hasOne, hasMany} from '@loopback/repository';
import {Room, User, TimeSlot} from './';

@model()
export class Reservation extends Entity {
  @property({
    type: 'string',
    id: true,
    mongodb: {dataType: 'ObjectID'},
  })
  id: string;

  @belongsTo(() => Room)
  roomId: string;

  @hasOne(() => TimeSlot)
  timeSlot: TimeSlot;

  @hasMany(() => User)
  users: User[];

  constructor(data?: Partial<Reservation>) {
    super(data);
  }
}

export interface ReservationRelations {
  // describe navigational properties here
}

export type ReservationWithRelations = Reservation & ReservationRelations;
