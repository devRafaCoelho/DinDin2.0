require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { routes } = require('./routes')

const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(8000, () => {
  console.log(`API connected on port 8000`)
})
