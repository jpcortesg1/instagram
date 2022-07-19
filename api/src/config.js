import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT;
export const URI_MONGO = process.env.URI_MONGO;
export const SECRET_KEY = process.env.SECRET_KEY;
