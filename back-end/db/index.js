const pgp = require('pg-promise')({});
const connection = 'postgres://localhost/instant5';

module.exports = pgp(connection);
