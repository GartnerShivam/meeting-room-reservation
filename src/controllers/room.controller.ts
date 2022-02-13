import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {Room} from '../models';
import {RoomRepository} from '../repositories';
import {basicAuthorization} from '../services';

export class RoomController {
  constructor(
    @repository(RoomRepository)
    public roomRepository : RoomRepository,
  ) {}

  @get('/rooms')
  @response(200, {
    description: 'Array of Room model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Room, {includeRelations: true}),
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['user', 'admin'],
    voters: [basicAuthorization],
  })
  async find(
    @param.filter(Room) filter?: Filter<Room>,
  ): Promise<Room[]> {
    return this.roomRepository.find({include: ['timeSlot']});
  }
}
