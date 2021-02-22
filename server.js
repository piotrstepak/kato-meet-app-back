import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import passport from "./config/passport.js";
import { catchErrors, notFound } from "./middlewares/errors.js";

//app config
const app = express();
const port = process.env.PORT || 3001;
const connectionUrl = process.env.CONNECTION_URL;

//passport config
passport();

//middlewares
app.use(express.json());
app.use(Cors());

//db config
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})
mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

//routes config
app.use('/users', usersRouter);
app.use('/auth', authRouter);

//errors handling
app.use(notFound);
app.use(catchErrors);

app.listen(port, () => {
    console.log(`Listening on localhost: ${port}`)
});
