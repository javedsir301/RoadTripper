module.exports = (sequelize, DataTypes) => {
    const Route = sequelize.define("Route", {
      from: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      to: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departureTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  
    return Route;
  };
  