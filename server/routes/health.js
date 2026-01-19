const healthRouter = require('express').Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns 200 status if the server is running
 *     tags: [health]
 *     security: []
 *     responses:
 *       200:
 *         description: Server is healthy
 */
healthRouter.get('/', (req, res) => { 
  res.sendStatus(200); 
});

/**
 * @swagger
 * /test-session:
 *   get:
 *     summary: Session testing endpoint
 *     description: Sets a test value in the session for debugging purposes
 *     tags: [health]
 *     security: []
 *     responses:
 *       200:
 *         description: Session set successfully
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: "Session set"
 */
healthRouter.get('/test-session', (req, res) => {
  req.session.test = 'test value';
  res.send('Session set');
});

module.exports = healthRouter;
