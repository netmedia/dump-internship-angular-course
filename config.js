require("dotenv").load();

module.exports = {
  environment: process.env.NODE_ENV,
  application: {
    ip: process.env.IP,
    port: process.env.PORT
  },
  db: {
    mongodb: {
      host: process.env.MONGODB_HOST,
      port: process.env.MONGODB_PORT,
      name: process.env.MONGODB_NAME,
      username: process.env.MONGODB_USERNAME,
      password: process.env.MONGODB_PASSWORD
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    authScheme: process.env.JWT_AUTH_SCHEME,
    ttl: process.env.JWT_TTL
  }
};
