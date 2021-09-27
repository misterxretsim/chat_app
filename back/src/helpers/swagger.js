require('dotenv').config()
const swaggerJsDoc = require('swagger-jsdoc')

const specs = swaggerJsDoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'A simple Express Library API',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
            },
        ],
    },
    apis: ['./src/api-docs/*.yaml'],
})

module.exports = specs
