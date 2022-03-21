module.exports = {
  type: process.env.TYPE,
  host: process.env.HOST,
  port: Number(process.env.PORT) || 5432,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
};
