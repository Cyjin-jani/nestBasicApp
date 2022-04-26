import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'board-app',
  entities: [__dirname + '/../**/*.entity.{js, ts}'],
  synchronize: true,
};

// synchronize : true를 주면 애플리케이션을 다시 실행할 때
// 엔티티 안에서 수정된 컬럼의 길이 타입 변경값 등을 해당 테이블을
// Drop 한 후 다시 생성해준다.
