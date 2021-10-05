path="`dirname \"$0\"`"
cd "$path/db_conf"
npm i
node index.js
mv database.db ../../back/db