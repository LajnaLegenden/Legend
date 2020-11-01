import app from "./app";
import compression from "compression";
import helmet from "helmet";
import { Logger } from './modules/logger';

let logger = new Logger()

const PORT = process.env.PORT || 3000

app.use(helmet()); // set well-known security-related HTTP headers
app.use(compression());

app.disable("x-powered-by");

const server = app.listen(PORT, () =>
    logger.log("info",`Legend API running on port ${PORT}`));

export default server;
