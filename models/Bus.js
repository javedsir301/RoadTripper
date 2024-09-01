module.exports = (sequelize, DataTypes) => {
  const Bus = sequelize.define("Bus", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    routeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Bus;
};
