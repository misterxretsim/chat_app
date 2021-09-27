require('dotenv').config()
const sqlite3 = require('sqlite3').verbose()

const createConn = () =>
    new sqlite3.Database(process.env.SQL_PATH, (err) => {
        if (err) {
            console.error(err.message)
        }
    })
const closeConn = (db) => {
    db.close((err) => {
        if (err) {
            console.error(err.message)
        }
    })
}
const sendStatusResponse = (rs, err) => {
    if (err) {
        console.error(err.message)
        rs.send({ status: 'error' })
    }
    rs.send({ status: 'ok' })
}

module.exports = { createConn, closeConn, sendStatusResponse }
