import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TaskEntity } from './tasks/task';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: true,
      typePaths: ['./**/*.graphql'],
          definitions: {
        path: join(process.cwd(), 'src/graphql.schema.ts'),
      },
    }),
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'develop',
      password: 'todoapp',
      database: 'develop',
      entities: [TaskEntity],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
