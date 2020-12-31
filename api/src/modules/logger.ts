"use strict";
import { transports, createLogger, format } from "winston"
import 'winston-daily-rotate-file'
import * as _ from 'lodash'
import 'moment'
import * as util from 'util'

export class Logger {

    // FIXME: Pass in config...

    winstonLogger: any
    constructor(private loggerConfig?: any) {
        const logLevel = _.get(loggerConfig, "level", "debug");
        this.loggerConfig = loggerConfig;
        this.winstonLogger = createLogger({
            level: logLevel,
            defaultMeta: { service: "legend-api", context: _.get(this.loggerConfig, "context", "") },
            format: format.combine(
                format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
                format.printf(
                    (info) => {
                        let elements = [info.timestamp, info.level];
                        // FIXME: Automate..
                        if (info.service) elements.push(info.service);
                        if (info.context) elements.push(info.context);
                        if (info.class) elements.push(info.class)
                        elements.push(info.message);
                        return elements.join(": ");
                    }
                )
            ),
            transports: [
                new transports.Console(),
                new (transports.DailyRotateFile)({
                    filename: "./../data/log/api-%DATE%.log",
                    datePattern: "YYYY-MM-DD",
                    zippedArchive: false,
                    maxSize: "20m",
                    maxFiles: "14d"
                })
            ]
        });
    }

    safeJson(arg: any) {
        try {
            return (util.inspect(arg, false, 0) || "").replace(/\r?\n|\r/g, "").replace(/\s+/g, " ");
        } catch (error) {
            return "<error converting to json> " + `(${error.message})`;
        }
    }

    argsToString(args: any[]) {
        return args.map(arg => this.safeJson(arg));
    }

    // FIXME: Consider providing values for each logging level.. automate though...
    log(level: any, message: any, ...args: any[]) {
        let suffix = (args && args.length) ? " " + this.argsToString(args) : "";
        this.winstonLogger.log({ level, message: message + suffix });
    }
}
