var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/test";
var db = pgp(connectionString);

module.exports = db;
