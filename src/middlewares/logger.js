import { logger } from "../utils.js";

export const addLogger = (req, res, next) => {
	req.logger = logger;
	req.logger.http(
		`${req.method} en ${req.url} - ${new Date().toLocaleString()}`
	);
	next();
};