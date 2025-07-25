export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongo_uri: process.env.MONGO_URI || 'mongodb://localhost:27017/nest-pokemon',
  port: process.env.PORT || 4500,
  defaultLimit: process.env.DEFAULT_LIMIT && +process.env.DEFAULT_LIMIT || 20,
})