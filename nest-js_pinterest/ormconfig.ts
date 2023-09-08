import { Comment } from 'src/database/comment.entity';
import { Follow } from 'src/database/follow.entity';
import { Image } from 'src/database/image.entity';
import { LikeLoveComment } from 'src/database/likelovecomment.entity';
import { OperationImage } from 'src/database/operationimage.entity';
import { ImageSavedUser } from 'src/database/saveimage.entity';
import { User } from 'src/database/user.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

require('dotenv').config();
export const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'root',
  entities: [
    User,
    Image,
    Comment,
    ImageSavedUser,
    OperationImage,
    LikeLoveComment,
    Follow,
  ],
  synchronize: false,
};
