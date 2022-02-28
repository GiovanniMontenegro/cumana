import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GenericResponse } from '../../../interfaces/genericResponse.interface';
import { GenericResponseStatus } from '../../../interfaces/genericStatus.interface';
import { HTTP_HEADER } from '../../../utils/constants';
import { User, UserRequest } from '../interface/user.interface';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * @returns Promise
   */
  @Get()
  @Header(HTTP_HEADER.CONTENT_TYPE, 'application/json')
  async findAll(): Promise<GenericResponse<User>> {
    const response: GenericResponse<User> = {};
    try {
      response.data = await this.usersService.findAll();
    } catch (error) {
      response.error = error;
    }
    return response;
  }

  /**
   *
   * @param id
   * @returns
   */
  @Get(':id')
  @Header(HTTP_HEADER.CONTENT_TYPE, 'application/json')
  async findOne(@Param('id') id: string): Promise<GenericResponse<User>> {
    const response: GenericResponse<User> = {};
    try {
      const userFound = await this.usersService.findOne(id);
      response.data = userFound;
    } catch (error) {
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return response;
  }

  @Post()
  @Header('Cache-Control', 'none')
  @Header(HTTP_HEADER.CONTENT_TYPE, 'application/json')
  async create(@Body() user: UserRequest): Promise<GenericResponse<User>> {
    const response: GenericResponse<User> = {};
    try {
      await this.usersService.create(user);
      response.status = GenericResponseStatus.OK;
    } catch (error) {
      response.error = error;
    }
    return response;
  }

  @Patch(':id')
  @Header(HTTP_HEADER.CONTENT_TYPE, 'application/json')
  async update(
    @Param('id') id: string,
    @Body() user: UserRequest,
  ): Promise<GenericResponse<User>> {
    const response: GenericResponse<User> = {};
    try {
      response.data = await this.usersService.update(id, user);
    } catch (error) {
      response.error = error;
    }
    return response;
  }

  @Delete(':id')
  @Header(HTTP_HEADER.CONTENT_TYPE, 'application/json')
  async delete(@Param('id') id: string): Promise<GenericResponse<User>> {
    const response: GenericResponse<User> = {};
    try {
      await this.usersService.delete(id);
      response.status = GenericResponseStatus.OK;
    } catch (error) {
      response.error = error;
    }
    return response;
  }
}
