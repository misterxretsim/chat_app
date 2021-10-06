const bodyToStr = (rq) => JSON.stringify(rq.body)
const currDateTime = (currDate) =>
    ('0' + currDate.getDay()).slice(-2) +
    '-' +
    ('0' + currDate.getMonth()).slice(-2) +
    '-' +
    currDate.getFullYear() +
    'T' +
    ('0' + currDate.getHours()).slice(-2) +
    ':' +
    ('0' + currDate.getMinutes()).slice(-2) +
    ':' +
    ('0' + currDate.getSeconds()).slice(-2) +
    '.' +
    ('00' + currDate.getMilliseconds()).slice(-3)
const logString = (rq) =>
    `Request:\n\tMethod: ${rq.method}\n\tURI: ${
        rq.url
    }\n\tDateTime: ${currDateTime(new Date())}\n\t` +
    'Authorization: ' +
    (rq.headers.authorization ? 'Yes\n\t' : 'No\n\t') +
    (bodyToStr(rq).length > 2 ? `Body: ${bodyToStr(rq)}\n` : '')
const logger = (rq) => console.log(logString(rq))

module.exports = logger
