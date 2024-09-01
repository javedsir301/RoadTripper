const Sequelize = require("sequelize");
const config = require("../config/config.json");
const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./User")(sequelize, Sequelize);
db.Bus = require("./Bus")(sequelize, Sequelize);
db.Route = require("./Route")(sequelize, Sequelize);
db.Booking = require("./Booking")(sequelize, Sequelize);

db.User.hasMany(db.Booking, { foreignKey: "userId" });
db.Booking.belongsTo(db.User, { foreignKey: "userId" });

db.Bus.hasMany(db.Booking, { foreignKey: "busId" });
db.Booking.belongsTo(db.Bus, { foreignKey: "busId" });

db.Route.hasMany(db.Bus, { foreignKey: "routeId" });
db.Bus.belongsTo(db.Route, { foreignKey: "routeId" });

module.exports = db;
