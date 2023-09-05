const fs = require('fs');
const path = require('path');

module.exports = function (req, res, next) {
    const logEntry = `[${new Date().toISOString()}] [${req.method}] ${req.url}\n`;
    fs.appendFileSync(path.join(__dirname, '../', 'logger.log'), logEntry);
    next();
};