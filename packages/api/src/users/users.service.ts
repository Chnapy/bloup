import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.usersRepository.save(createUserInput);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: User['id']) {
    return this.usersRepository.findOneBy({ id });
  }

  update(updateUserInput: UpdateUserInput) {
    return this.usersRepository.update(updateUserInput.id, updateUserInput);
  }

  remove(id: User['id']) {
    return this.usersRepository.delete(id);
  }
}
