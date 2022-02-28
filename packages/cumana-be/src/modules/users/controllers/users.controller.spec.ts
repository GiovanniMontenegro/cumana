import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GenericResponse } from '../../../interfaces/genericResponse.interface';
import { EMPTY_RESPONSE } from '../../../utils/constants';
import { User } from '../interface/user.interface';
import { UsersService } from '../services/users.service';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  it('controller to be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findOne - should return an user', async () => {
    const result: User = {
      id: '123',
      name: 'test',
      lastName: 'test',
      email: 'test@test.com',
    };
    jest.spyOn(usersService, 'findOne').mockImplementation(async () => result);
    const found = await controller.findOne('123');
    expect(typeof found).toBe('object');
    expect(Object.keys(found).length).toBe(1);
    const expectedResponse: GenericResponse<User> = {
      data: result,
    };
    expect(found).toEqual(expectedResponse);
  });

  it('findOne - return empty object', async () => {
    const found = await controller.findOne('123');
    expect(typeof found).toBe('object');
    expect(Object.keys(found).length).toBe(1);
    const expectedResponse: GenericResponse<User> = {
      data: EMPTY_RESPONSE,
    };
    expect(found).toEqual(expectedResponse);
  });

  it('findOne - internal server error', async () => {
    jest.spyOn(usersService, 'findOne').mockImplementation(() => {
      throw new Error();
    });
    expect(controller.findOne('123')).rejects.toThrowError(
      new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      ),
    );
  });
});
