/**
 * Main application module.
 * @module app
 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/**
 * Express application.
 * @type {object}
 * @const
 */
const app = express();

/**
 * Middleware setup.
 * Apply JSON parsing to all incoming requests.
 * Enable Cross-Origin Resource Sharing (CORS).
 */
app.use(bodyParser.json());
app.use(cors());

/**
 * Devices API module.
 * @module api/devices
 */
const devices = require('./routes/api/devices');

/**
 * Mounting the devices router on the application.
 * All routes defined in the devices router will be prefixed with '/api/devices'.
 */
app.use('/api/devices', devices)

/**
 * Server listening port. Default is 5000.
 * @type {number}
 */
const port = process.env.PORT || 5000;

/**
 * Start the application server.
 */
app.listen(port, () => {
  console.log(`Server started on port: ${port}`)
})