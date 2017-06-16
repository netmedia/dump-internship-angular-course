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
      database: process.env.MONGODB_NAME,
      user: process.env.MONGODB_USERNAME,
      password: process.env.MONGODB_PASSWORD
    }
  }
};
