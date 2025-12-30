import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { User } from 'src/Users/user/entities/user.entity';
import { RoleEnum } from 'src/common/enum/role.enum';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);

  const adminFirstName = process.env.ADMIN_FIRST_NAME!;
  const adminLastName = process.env.ADMIN_LAST_NAME!;
  const adminEmail = process.env.ADMIN_EMAIL!;
  const adminPassword = process.env.ADMIN_PASSWORD!;

  const existingAdmin = await userRepo.findOne({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const admin = userRepo.create({
      first_name: adminFirstName,
      last_name: adminLastName,
      email: adminEmail,
      password: hashedPassword,
      role: RoleEnum.ADMIN,
    });

    await userRepo.save(admin);
    console.log('Admin created successfully');
  } else {
    console.log('Admin already exists');
  }

  await AppDataSource.destroy();
}

main().catch((err) => console.error(err));
