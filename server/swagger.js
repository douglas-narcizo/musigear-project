const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { PORT } = require('./config');

const options = {
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'E-commerce REST API',
            version: '1.0.7',
            description: `This is the starter point for an **E-commerce Server** based on the OpenAPI 3.0 specification.<br>
            It's part of a Portfolio Project on Codecademy's **Full Stack Engineer** career path.<br><br>
            **Authentication**: This API uses session-based authentication. After logging in via /user/login, /user/google, or /user/facebook, 
            the server establishes a session and returns a session cookie. This cookie must be included in subsequent requests to authenticated endpoints.`,
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'connect.sid',
                    description: 'Session cookie for authentication. Obtained after successful login.'
                }
            }
        },
        security: [
            {
                cookieAuth: []
            }
        ]
    },
    apis: ['./routes/*.js', './index.js'],
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;
