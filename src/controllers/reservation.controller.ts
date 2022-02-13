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
import {Reservation, TimeSlot} from '../models';
import {ReservationRepository, UserRepository} from '../repositories';
import ts from '../fixtures/time-slots.json';

export class ReservationController {
  constructor(
    @repository(ReservationRepository)
    public reservationRepository : ReservationRepository,
    @repository(UserRepository)
    public userRepository : UserRepository,
  ) {}

  @post('/reservations')
  @response(200, {
    description: 'Reservation model instance',
    content: {'application/json': {schema: getModelSchemaRef(Reservation)}},
  })
  async create(
    @requestBody() reservation: any,
  ): Promise<Reservation> {
    const reser = await this.reservationRepository.findOne({
      where: {
        roomId: reservation.roomId,
        timeSlotId: reservation.timeSlotId
      },
    });
    const a = await this.userRepository.findById(reservation.userId);
    if (!reser) {
      const createdReservation = await this.reservationRepository.create({
        roomId: reservation.roomId,
        timeSlotId: reservation.timeSlotId,
        users: [a],
      });
      return createdReservation;
    } else {
      const i = reser.users.findIndex(u => u.id === reservation.userId);
      if (i > -1) {
        reser.users.splice(i, 1);
      } else {
        reser.users.push(a);
      }
      this.reservationRepository.updateById(reser.id, {users: reser.users});
      return reser;
    }
  }

  @get('/reservations')
  @response(200, {
    description: 'Array of Reservation model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Reservation, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Reservation) filter?: Filter<Reservation>,
  ): Promise<Reservation[]> {
    return this.reservationRepository.find(filter);
  }

  @del('/reservations/{id}')
  @response(204, {
    description: 'Reservation DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.reservationRepository.deleteById(id);
  }
}
