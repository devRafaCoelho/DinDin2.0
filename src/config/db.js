const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_URL,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE
    //ssl: { rejectUnauthorized: false }
  }
})

module.exports = { knex }
