import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
import nextUserToDisplay from './routes/nextUserToDisplay.js';

//app config
dotenv.config();
const app = express();
const port = process.env.PORT || 3001;
const connectionUrl = process.env.CONNECTION_URL

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

app.use('/users', usersRouter);
app.use('/nextUserToDisplay', nextUserToDisplay);

app.listen(port, () => {
    console.log(`Listening on localhost: ${port}`)
});
