require('dotenv').config()
const https = require('https')
const express = require('express')
const router = express.Router()

const options = {
    host: process.env.COVID_URI,
    port: process.env.COVID_PORT,
    path: process.env.COVID_PATH,
}

router.get('/api/covid', (rq, rs) => {
    if (rq.user) {
        let body = ''

        const httpsReq = https.request(options, (res) => {
            res.on('data', (chunk) => {
                body += chunk
            })
            res.on('end', () => {
                const parseBody = JSON.parse(body)
                rs.send(
                    parseBody
                        .filter((el, i) => (i > 530 && i < 551 ? el : null))
                        .map((el, id) => {
                            return {
                                id,
                                date: el.Date.substr(0, 10),
                                confirmed: el.Confirmed,
                                active: el.Active,
                                recovered: el.Recovered,
                                deaths: el.Deaths,
                            }
                        })
                )
            })
        })
        httpsReq.end()
    } else return rs.status(401).json({ message: 'Not authorized' })
})

module.exports = router
