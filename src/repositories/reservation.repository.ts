import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Reservation, ReservationRelations} from '../models';

export class ReservationRepository extends DefaultCrudRepository<
  Reservation,
  typeof Reservation.prototype.id,
  ReservationRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Reservation, dataSource);
  }
}
