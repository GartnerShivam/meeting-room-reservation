import {inject} from '@loopback/core';
import {DefaultCrudRepository,HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Room, RoomRelations, TimeSlot} from '../models';
import {TimeSlotRepository} from './time-slot.repository';
import {} from './index';

export class RoomRepository extends DefaultCrudRepository<Room, typeof Room.prototype.id, RoomRelations> {
  public timeSlots: HasManyRepositoryFactory<TimeSlot, typeof Room.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository(TimeSlotRepository) protected timeSlotsRepository: TimeSlotRepository,
  ) {
    super(Room, dataSource);
    this.timeSlots = this.createHasManyRepositoryFactoryFor(
      'timeSlots',
      async () => timeSlotsRepository,
    );
    this.registerInclusionResolver('timeSlots', this.timeSlots.inclusionResolver);
  }
}
