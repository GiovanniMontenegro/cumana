import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('findOne', () => {
    const found = service.findOne('132');
    expect(typeof found).toBe('object');
    expect(Object.keys(found).length).toBe(0);
  });
});
