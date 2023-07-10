import multer from "multer";
import {fileURLToPath} from "url";
import { dirname } from "path";
import bcrypt from "bcrypt"
import winston from "winston";
import config from "./config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null , `${__dirname}/public/images`);
    },
    filename: function (req, file, cb){
        cb(null,`${Date.now()}-${file.originalname}`);
    },
});

export const createHash = (password) =>
	bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
	bcrypt.compareSync(password, user.password);

export const uploader = multer({storage})
export default __dirname;

const customLevelOptions = {
	levels: {
		fatal: 0,
		error: 1,
		warning: 2,
		info: 3,
		http: 4,
		debug: 5,
	},
	colors: {
        http:"blue",
		fatal: "red",
        error: "orange",
        warning: "yellow",
        info: "blue",
        debug: "white",
	},
};

const devLogger = winston.createLogger({
	levels: customLevelOptions.levels,
	format: winston.format.json(),
	transports: [
		new winston.transports.Console({
			level: "debug",
			format: winston.format.combine(
				winston.format.colorize({
					colors: customLevelOptions.colors,
				}),
				winston.format.simple()
			),
		}),
	],
});

const prodLogger = winston.createLogger({
	levels: customLevelOptions.levels,
	format: winston.format.json(),
	transports: [
		new winston.transports.Console({
			level: "info",
			format: winston.format.combine(
				winston.format.colorize({
					colors: customLevelOptions.colors,
				}),
				winston.format.simple()
			),
		}),
		new winston.transports.File({
			filename: "logs/errors.log",
			level: "error",
			format: winston.format.simple(),
		}),
	],
});

export const logger = config.ENV === "development" ? devLogger : prodLogger;