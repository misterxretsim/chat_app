require('dotenv').config()
const app = require('express')()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const swaggerUI = require('swagger-ui-express')
const specs = require('./src/helpers/swagger')
const better = require('better-sqlite3')(process.env.SQL_PATH)

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))
app.use(bodyParser.json(), (rq, rs, next) => {
    require('./src/helpers/logger')(rq)
    next()
})
app.use((rq, rs, next) => {
    if (rq.headers.authorization) {
        jwt.verify(
            rq.headers.authorization.split(' ')[1],
            process.env.JWT,
            async (er, payload) => {
                try {
                    if (er) next()
                    else if (payload) {
                        const result = better
                            .prepare('SELECT * FROM Profile WHERE id=?')
                            .get(payload.id)
                        if (result) {
                            rq.user = result
                        }
                    }
                } catch (er) {
                    console.error(er.message)
                    next()
                }
            }
        )
    }
    next()
})

app.all('/api/chats*', require('./src/routes/chats'))
app.all('/api/profile', require('./src/routes/profile'))
app.all('/api/covid', require('./src/routes/covid'))
app.all('/api/login*', require('./src/routes/login'))

app.listen(process.env.PORT, () => {
    console.log(`Active:\nhttp://${process.env.HOST}:${process.env.PORT}\n`)
})
