module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    busId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seatsBooked: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookingDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return Booking;
};
