import { RoleEnum } from '../enum/role.enum';

export interface JwtPayload {
  userId: string;
  email: string;
  role: RoleEnum;
}
