import { User } from 'src/Users/user/entities/user.entity';

export const USER_REPOSITORY = 'IUserRepository';
export interface UserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  createAndSave(user: Partial<User>): Promise<User>;
  save(user: User): Promise<User>;
  remove(user: User): Promise<void>;
}
