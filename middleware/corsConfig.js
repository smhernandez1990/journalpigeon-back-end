const cors = require('cors')

const corsConfig = {
    origin:'https://journal-pigeon.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}

module.exports = corsConfig