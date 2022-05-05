import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/authCredential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword });
    try {
      await this.save(user);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Already Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
