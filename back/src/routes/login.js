const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { createConn, closeConn } = require('../helpers/db')

const defaultErrorMsg = {
    status: 'error',
    msg: 'Извините, что-то пошло не так, попробуйте позднее...',
}

router.post('/api/login/signin', (rq, rs) => {
    const { email, pass } = rq.body
    const db = createConn()
    db.get(
        `SELECT * FROM Profile WHERE email='${email}' AND pass='${pass}'`,
        [],
        (er, row) => {
            if (er) {
                console.error(er.message)
                rs.status(500).json({
                    status: 'error',
                    message: 'Ошибка сервера',
                })
            }
            if (row) {
                const { id } = row
                rs.status(200).json({
                    status: 'ok',
                    profile: row,
                    token: `Bearer ${jwt.sign({ id }, process.env.JWT, {
                        expiresIn: 60 * 60 * 24 * 7,
                    })}`,
                })
            } else
                rs.status(404).json({
                    status: 'error',
                    message: 'Пользователь не найден',
                })
        }
    )
    closeConn(db)
})

router.post('/api/login/check', (rq, rs) => {
    const { email } = rq.body
    const db = createConn()

    db.all(`SELECT * FROM Profile WHERE email='${email}'`, [], (err, rows) => {
        if (err) {
            console.error(err.message)
            rs.code(500).json(defaultErrorMsg)
        }
        if (rows.length)
            rs.status(500).json({
                status: 'error',
                msg: 'Такой email уже используется, попробуйте другой',
            })
        else rs.code(200).json({ status: 'ok' })
    })

    closeConn(db)
})

router.post('/api/login/signup', (rq, rs) => {
    const { email, pass, name, gender, birthdate, time } = rq.body
    const db = createConn()

    db.run(
        `INSERT INTO Profile (name, email, pass, gender, birthdate) VALUES ('${name}', '${email}', '${pass}', '${gender}', '${birthdate}')`,
        [],
        function (err) {
            if (err) {
                console.error(err.message)
                rs.send(defaultErrorMsg)
            } else {
                const profile_id = this.lastID
                db.run(
                    `INSERT INTO Chats (name, email, profile_id) VALUES ('Robot', 'robot@aa.aa', ${profile_id})`,
                    [],
                    function (err) {
                        if (err) {
                            console.error(err.message)
                            rs.send(defaultErrorMsg)
                        } else {
                            const chat_id = this.lastID
                            db.run(
                                `INSERT INTO Msgs (msg_text, profile_owner, msg_time, chat_id) VALUES ('Привет! Я - Робот, ты можешь задавать мне любые вопросы.', 0, '${time}', ${chat_id})`,
                                [],
                                (err) => {
                                    if (err) {
                                        console.error(err.message)
                                        rs.send(defaultErrorMsg)
                                    } else {
                                        rs.send({
                                            status: 'ok',
                                            profile: {
                                                id: profile_id,
                                                name,
                                                email,
                                                pass,
                                                gender,
                                                birthdate,
                                            },
                                            token: `Bearer ${jwt.sign(
                                                { id: profile_id },
                                                process.env.JWT,
                                                {
                                                    expiresIn: 60 * 60 * 24 * 7,
                                                }
                                            )}`,
                                        })
                                    }
                                }
                            )
                        }
                    }
                )
            }
        }
    )

    closeConn(db)
})

module.exports = router
