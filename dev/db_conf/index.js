const fs = require('fs')
const sqlite3 = require('sqlite3').verbose()

fs.appendFileSync('database.db', '')

const db = new sqlite3.Database('database.db', (err) => {
    if (err) {
        console.error(err.message)
    }
})

db.all(
    'CREATE TABLE "Profile" ("id" INTEGER NOT NULL UNIQUE,"name" TEXT NOT NULL,"email" TEXT NOT NULL UNIQUE,"pass" TEXT NOT NULL,"gender" TEXT NOT NULL,"birthdate" TEXT NOT NULL, PRIMARY KEY("id" AUTOINCREMENT))',
    [],
    (err) => {
        if (err) {
            console.error(err.message)
        }
    }
)
db.all(
    'CREATE TABLE Chats(id INTEGER UNIQUE,name TEXT NOT NULL,email TEXT NOT NULL,profile_id INTEGER NOT NULL, PRIMARY KEY("id" AUTOINCREMENT) FOREIGN KEY (profile_id) REFERENCES Profile(id))',
    [],
    (err) => {
        if (err) {
            console.error(err.message)
        }
    }
)
db.all(
    'CREATE TABLE "Msgs" ("id" INTEGER UNIQUE,"msg_text" TEXT NOT NULL,"profile_owner" INTEGER NOT NULL,"msg_time" TEXT NOT NULL,"chat_id" INTEGER NOT NULL, PRIMARY KEY("id" AUTOINCREMENT), FOREIGN KEY("chat_id") REFERENCES "Chats"("id"))',
    [],
    (err) => {
        if (err) {
            console.error(err.message)
        }
    }
)

db.close((err) => {
    if (err) {
        console.error(err.message)
    }
})
