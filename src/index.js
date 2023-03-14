require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { routes } = require('./routes')

const PORT = process.env.PORT || 8000
const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`API connected on port ${PORT}`)
})
