import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { EMPTY_RESPONSE } from '../../../utils/constants';
import { User, UserRequest } from '../interface/user.interface';

@Injectable()
export class UsersService {
  private readonly users: Array<User> = [];

  async findOne(id: string): Promise<User | Record<string, never>> {
    let userFind = {};
    try {
      userFind = this.users.find((user) => user.id === id);
      if (!userFind) {
        userFind = EMPTY_RESPONSE;
      }
    } catch (error) {
      console.debug('error: ', error);
    }
    return userFind;
  }

  /**
   *
   * @returns
   */
  async findAll(): Promise<Array<User>> {
    let users = [];
    try {
      users = this.users;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return users;
  }

  async create(userRq: UserRequest): Promise<void> {
    try {
      this.users.push({
        id: uuidv4(),
        ...userRq,
      });
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  /**
   *
   * @param id
   * @param userRq
   * @returns
   */
  async update(id: string, userRq: UserRequest): Promise<User> {
    let userFind = undefined;
    try {
      const indexToUpdate = this.users.findIndex((user) => user.id === id);
      const oldUserValues = this.users[indexToUpdate];
      const updateUser = {
        id,
        ...oldUserValues,
        ...userRq,
      };
      this.users[indexToUpdate] = updateUser;
      userFind = updateUser;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return userFind;
  }

  async delete(id: string): Promise<void> {
    try {
      const indexToDelete = this.users.findIndex((user) => user.id === id);
      this.users.splice(indexToDelete, 1);
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
