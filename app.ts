import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import connectDb from "./dbs/init.mongodb";
import { countConnect, checkOverload } from "./helpers/check.connect";
import bodyParser from "body-parser";
import routes from "./routes";
import redisClient from "./redisClient";
import myLoggerLog from "./loggers/myLogger.log";
import { v4 as uuid4 } from "uuid";

const app: Express = express();

// redisClient
//   .connect()
//   .then(() => console.log('Connected to redis'))
//   .catch((error) => console.log(error));

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//log nang cao
app.use((req: any, res, next) => {
  const requestId = req.headers["X-request-id"];
  req.requestId = requestId ? requestId : uuid4();
  myLoggerLog.log(`Input params :: ${req.method}::`, [
    req.path,
    {
      requestId: req.requestId,
    },
    req.method === "POST" ? req.body : req.query,
  ]);
  next();
});

connectDb;

countConnect();

checkOverload();

app.use("/", routes);

app.get("/", (err, res) => {
  res.status(200).json({
    message: "Hello World!",
  });
});

// log nang cao
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  const resMessage = `${error.status} - ${Date.now() - error.now}ms - Response: 
  ${JSON.stringify(error)}`;

  myLoggerLog.error(resMessage, [
    req.path,
    {
      requestId: error.requestId,
    },
    {
      message: error.message,
    },
  ]);
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error",
  });
});

export default app;
