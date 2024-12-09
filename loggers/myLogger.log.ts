import { createLogger, transports, format } from "winston";
import winston from "winston";
import "winston-daily-rotate-file";
import { v4 as uuid4 } from "uuid";

class MyLogger {
  logger: winston.Logger;
  constructor() {
    const formatPrint = format.printf(
      ({ level, message, context, requestId, timestamp, metadata }) => {
        return `${timestamp}::${level}::${context}::${requestId}::${message}::${JSON.stringify(metadata)}`;
      }
    );

    this.logger = createLogger({
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        formatPrint
      ),

      transports: [
        new transports.Console(),
        new transports.DailyRotateFile({
          dirname: "./logs",
          filename: "app-%DATE%.info.log",
          datePattern: "YYYY-MM-DD-HH-mm",
          zippedArchive: true,
          maxSize: "1m",
          maxFiles: "14d",
          format: format.combine(
            format.timestamp({
              format: "YYYY-MM-DD HH:mm:ss",
            }),
            formatPrint
          ),
          level: "info",
        }),

        new transports.DailyRotateFile({
          dirname: "./logs",
          filename: "app-%DATE%.error.log",
          datePattern: "YYYY-MM-DD-HH-mm",
          zippedArchive: true,
          maxSize: "1m",
          maxFiles: "14d",
          format: format.combine(
            format.timestamp({
              format: "YYYY-MM-DD HH:mm:ss",
            }),
            formatPrint
          ),
          level: "error",
        }),
      ],
    });
  }

  commonParams(params) {
    let context, req, metadata;
    if (!Array.isArray(params)) {
      context = params;
    } else {
      [context, req, metadata] = params;
    }
    const requestId = req?.requestId || uuid4();

    return {
      context,
      requestId,
      metadata,
    };
  }

  log(message, params) {
    const paramLog = this.commonParams(params);
    const logObject = Object.assign(
      {
        message,
      },
      paramLog
    );

    this.logger.info(logObject);
  }

  error(message, params) {
    const paramLog = this.commonParams(params);
    const logObject = Object.assign(
      {
        message,
      },
      paramLog
    );

    this.logger.error(logObject);
  }
}

export default new MyLogger();
