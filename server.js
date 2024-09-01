const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");

const app = express();

app.use(bodyParser.json());

const authRoutes = require("./routes/auth");
const bookingRoutes = require("./routes/bookings");
const busRoutes = require("./routes/buses");
const paymentRoutes = require("./routes/payments");
const routeRoutes = require("./routes/routes");

app.use("/auth", authRoutes);
app.use("/bookings", bookingRoutes);
app.use("/buses", busRoutes);
app.use("/payments", paymentRoutes);
app.use("/routes", routeRoutes);

const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at https://localhost/${PORT}`);
  });
});
