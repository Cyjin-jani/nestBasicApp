import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/authCredential.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const user = this.create({ username, password });
    await this.save(user);
  }
}
