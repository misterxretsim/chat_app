const express = require('express')
const router = express.Router()
const { createConn, closeConn, sendStatusResponse } = require('../helpers/db')

router.get('/api/chats/all', (rq, rs) => {
    if (rq.user) {
        const db = createConn()
        const id = rq.user.id

        db.all(
            `SELECT id, name, email FROM Chats WHERE Chats.profile_id=${id}`,
            [],
            (err, rows) => {
                if (err) {
                    console.error(err.message)
                    rs.sendStatus(500)
                }
                rs.send(rows)
            }
        )

        closeConn(db)
    } else return rs.status(401).json({ message: 'Not authorized' })
})

router.get('/api/chats', (rq, rs) => {
    if (rq.user) {
        const id = rq.user.id
        const db = createConn()

        db.all(
            `SELECT Msgs.chat_id, Chats.name, Msgs.id, Msgs.msg_text, Msgs.profile_owner, Msgs.msg_time FROM Chats, Msgs WHERE Chats.profile_id=${id} AND Chats.id=Msgs.chat_id`,
            [],
            (err, rows) => {
                if (err) {
                    console.error(err.message)
                    rs.sendStatus(500)
                } else {
                    const response = rows.reduce((acc, cur) => {
                        if (
                            !!acc.length &&
                            acc.find((el) => el.id === cur.chat_id)
                        ) {
                            acc.forEach((el) => {
                                if (el.id === cur.chat_id)
                                    el.messages = [
                                        ...el.messages,
                                        {
                                            id: cur.id,
                                            text: cur.msg_text,
                                            profile_owner: !!cur.profile_owner,
                                            time: cur.msg_time,
                                        },
                                    ]
                            })
                            return acc
                        } else {
                            return [
                                ...acc,
                                {
                                    id: cur.chat_id,
                                    name: cur.name,
                                    messages: [
                                        {
                                            id: cur.id,
                                            text: cur.msg_text,
                                            profile_owner: !!cur.profile_owner,
                                            time: cur.msg_time,
                                        },
                                    ],
                                },
                            ]
                        }
                    }, [])

                    rs.send(response)
                }
            }
        )

        closeConn(db)
    } else return rs.status(401).json({ message: 'Not authorized' })
})

router.post('/api/chats/create', (rq, rs) => {
    if (rq.user) {
        const {name, email} = rq.body
        const db = createConn()

        db.run(
            `INSERT INTO Chats (name, email, profile_id) VALUES ('${name}', '${email}', ${rq.user.id})`,
            [],
            (err) => sendStatusResponse(rs, err)
        )

        closeConn(db)
    } else return rs.status(401).json({ message: 'Not authorized' })
})

router.get('/api/chats/delete', (rq, rs) => {
    if (rq.user) {
        const id = rq.query.id
        const db = createConn()

        db.run(`DELETE FROM Chats WHERE id=${id}`, [], (err) => {
            if (err) {
                console.error(err.message)
                rs.send({ status: 'error' })
            } else {
                db.run(`DELETE FROM Msgs WHERE chat_id=${id}`, [], (err) =>
                    sendStatusResponse(rs, err)
                )
            }
        })

        closeConn(db)
    } else return rs.status(401).json({ message: 'Not authorized' })
})

router.post('/api/chats/new-message', (rq, rs) => {
    if (rq.user) {
        const body = rq.body
        const db = createConn()

        db.run(
            `INSERT INTO Msgs (msg_text, profile_owner, msg_time, chat_id) VALUES ('${body.text}', ${body.profile_owner}, '${body.time}', ${body.id})`,
            [],
            (err) => sendStatusResponse(rs, err)
        )

        closeConn(db)
    } else return rs.status(401).json({ message: 'Not authorized' })
})

module.exports = router
