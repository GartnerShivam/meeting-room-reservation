import {Getter, inject} from '@loopback/core';
import {repository, DefaultCrudRepository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Reservation, ReservationRelations, TimeSlot} from '../models';
import {TimeSlotRepository} from '../repositories';

export class ReservationRepository extends DefaultCrudRepository<
  Reservation,
  typeof Reservation.prototype.id,
  ReservationRelations
> {
  
  public timeSlot: HasOneRepositoryFactory<TimeSlot, typeof TimeSlot.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository.getter('TimeSlotRepository') public timeSlotRepositoryGetter: Getter<TimeSlotRepository>,
  ) {
    super(Reservation, dataSource);
    this.timeSlot = this.createHasOneRepositoryFactoryFor(
      'timeSlot',
      timeSlotRepositoryGetter,
    );
  }
}
