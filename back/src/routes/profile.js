const express = require('express')
const { createConn, closeConn, sendStatusResponse } = require('../helpers/db')
const router = express.Router()

router.get('/api/profile', (rq, rs) => {
    if (rq.user) {
        const id = rq.query.id
        const db = createConn()

        db.get(`SELECT * FROM Profile WHERE id=${id}`, [], (err, row) => {
            if (err) {
                console.error(err.message)
                rs.send({ status: 'error' })
            }
            rs.send(row)
        })

        closeConn(db)
    } else return rs.status(401).json({ message: 'Not authorized' })
})

router.post('/api/profile', (rq, rs) => {
    if (rq.user) {
        const body = rq.body
        const db = createConn()

        db.all(
            `UPDATE Profile SET name = '${body.name}', email = '${body.email}', pass = '${body.pass}', gender = '${body.gender}', birthdate = '${body.birthdate}' WHERE id = ${body.id}`,
            [],
            (err) => sendStatusResponse(rs, err)
        )

        closeConn(db)
    } else return rs.status(401).json({ message: 'Not authorized' })
})

module.exports = router
