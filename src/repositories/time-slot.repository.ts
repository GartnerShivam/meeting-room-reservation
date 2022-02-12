import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {TimeSlot, TimeSlotRelations} from '../models';

export class TimeSlotRepository extends DefaultCrudRepository<
  TimeSlot,
  typeof TimeSlot.prototype.id,
  TimeSlotRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(TimeSlot, dataSource);
  }
}
