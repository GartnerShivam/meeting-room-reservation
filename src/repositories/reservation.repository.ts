import {Getter, inject} from '@loopback/core';
import {repository, DefaultCrudRepository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Reservation, ReservationRelations, TimeSlot, User} from '../models';
import {TimeSlotRepository, UserRepository} from '../repositories';

export class ReservationRepository extends DefaultCrudRepository<
  Reservation,
  typeof Reservation.prototype.id,
  ReservationRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource
  ) {
    super(Reservation, dataSource);
  }
}
