const http = require('http');
const app = require('./app');
const config = require('./utils/config');
const logger = require('./utils/logger');

const server = http.createServer(app);

const port = config.PORT || 3001;

server.listen(port, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
