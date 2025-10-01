import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './modules/employee/module/employee.module';
import { Employee } from './modules/employee/entities/employee.entity';
import { Department } from './modules/employee/entities/department.entity';
import { Position } from './modules/employee/entities/position.entity';
import { Work } from './modules/employee/entities/work.entity';
import { User } from './modules/employee/entities/user.entity';
import { AuthModule } from './modules/employee/module/auth.module';
import { DepartmentModule } from './modules/employee/module/department.module';
import { PositionModule } from './modules/employee/module/position.module';
import { WorkModule } from './modules/employee/module/work.module';
import { Auth } from './modules/employee/entities/auth.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'pg-21495903-employeedemo10000.b.aivencloud.com',
      port: 27587,
      username: 'avnadmin',
      password: 'AVNS_Hyt1cIkdkKeGYTuMFiX',
      database: 'defaultdb',
      entities: [Employee, Department, Position, Work, User,Auth],
      synchronize: false,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    EmployeeModule,
    DepartmentModule,
    PositionModule,
    WorkModule,
    AuthModule,
  ],
})
export class AppModule {}
