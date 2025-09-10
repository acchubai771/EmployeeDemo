// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeModule } from './modules/employee/module/employee.module';
import { Employee } from './entities/employee.entity';
import { Department } from './entities/department.entity';
import { Position } from './entities/position.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'pg-21495903-employeedemo10000.b.aivencloud.com',
      port: 27587,
      username: 'avnadmin',
      password: 'AVNS_Hyt1cIkdkKeGYTuMFiX',
      database: 'defaultdb',
      entities: [Employee, Department, Position],
      synchronize: false,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    EmployeeModule,
    
  ],
})
export class AppModule {}
