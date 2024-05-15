import express, { Express } from "express";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import connectDb from "./dbs/init.mongodb";
import {countConnect , checkOverload} from "./helpers/check.connect"
import bodyParser from "body-parser";
import routes from "./routes"
import redisClient from './redisClient';

const app: Express = express();

// redisClient
//   .connect()
//   .then(() => console.log('Connected to redis'))
//   .catch((error) => console.log(error));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(helmet())
app.use(compression())
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

connectDb

countConnect()

checkOverload()

app.use('/', routes);

app.get('/' , (err, res) => {
    res.status(200).json({
        message: 'Hello World!'
    })
})

app.use(( error , req, res , next) => {
    const statusCode = error.status || 500;
    return res.status(statusCode).json({
        status : 'error',
        code : statusCode,
        message : error.message || 'Internal Server Error'
    })
})

export default app