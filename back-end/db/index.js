
const pgp = require('pg-promise')({});
const connection = 'postgres://localhost/instant5';

module.exports = pgp(connection);
var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/test";
var db = pgp(connectionString);

module.exports = db;

