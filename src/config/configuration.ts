export default () => ({
  dbUser: process.env.DATABASE_USER,
  dbPassword: process.env.DATABASE_PASSWORD,
  dbName: process.env.DATABASE_NAME,
  dbDialect: process.env.DATABASE_DIALECT,
  dbHost: process.env.DATABASE_HOST,
  dbPort: process.env.DATABASE_PORT,
});
