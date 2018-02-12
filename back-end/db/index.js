var pgp = require("pg-promise")({});
var connectionString = "postgres://localhost/instant5";
var db = pgp(connectionString);

module.exports = db;
