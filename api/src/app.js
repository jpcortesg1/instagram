// Required modules
import express from "express";
import _ from "./database/index.js";
import routes from "./routes/index.routes.js";
import { PORT } from "./config.js";

// Create app
const app = express();

// Settings
app.set("port", PORT || 5000);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Endpoints
app.use("/api/v1", routes);

export default app;
