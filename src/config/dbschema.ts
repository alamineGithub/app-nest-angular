import * as Joi from 'joi';

export const configurationSchema = Joi.object({
  DATABASE_HOST: Joi.string().default('mysql'),
  DATABASE_PORT: Joi.number().default(3306),
  DATABASE_USER: Joi.string().default('root'),
  DATABASE_PASSWORD: Joi.string().default('root'),
  DATABASE_NAME: Joi.string().default('nestjs_books'),
  PORT: Joi.number().default(3001),
});
