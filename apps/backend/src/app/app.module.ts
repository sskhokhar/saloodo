import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { AppController } from './app.controller';

import { MongoMemoryServer } from 'mongodb-memory-server';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/services';
import seedData from '../../seed-data';
import { User } from './types/user';
import { ParcelModule } from './parcel/parcel.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();

        return { uri };
      },
    }),
    UserModule,
    AuthModule,
    ParcelModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private userService: UserService) {}
  async onApplicationBootstrap() {
    const seedUsers = await this.userService.createMany(seedData as User[]);
    console.log(
      `🚀 ~ file: app.module.ts ~ line 34 ~ AppModule ~ onApplicationBootstrap ~ seedUsers`,
      seedUsers
    );
  }
}
