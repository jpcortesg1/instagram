import mongoose from "mongoose";
import { URI_MONGO } from "./../config.js";

export default mongoose
  .connect(URI_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`successfully connected`);
  })
  .catch((e) => {
    console.log(`not connected`, e);
  });
