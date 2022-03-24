import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import userRouter from "./routes/user.js";
import eventRouter from "./routes/event.js";

const app = express();
const PORT = process.env.PORT;
const CONNECTION_URL = process.env.CONNECTION_URL;

app.use(express.json());

app.use('/user', userRouter);
app.use('/event', eventRouter);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`) ))
    .catch((error) => console.log(error.message));



