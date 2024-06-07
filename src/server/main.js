import express from "express";
import ViteExpress from "vite-express";
import connectDB from "./config/database.js";
import authController from "./controllers/auth_controller.js";
import itineraryController from "./controllers/itinerary_controller.js";
import daysController from "./controllers/day_controller.js";
import activityController from "./controllers/activity_controller.js"


const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

// itinerary controller for itinerary paths
app.use("/itinerary", itineraryController)
app.use("/day", daysController)
app.use("/activity", activityController)
//auth controller for login paths
app.use(authController)


ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000."),
);
