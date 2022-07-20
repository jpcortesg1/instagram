// Required modules
import express from "express";
import db from "./database/index.js"
import authRoutes from "./routes/auth.routes.js";
import { PORT } from "./config.js";

// Create app
const app = express();

// Settings
app.set("port", PORT || 5000);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Endpoints
app.use(authRoutes);

export default app;
