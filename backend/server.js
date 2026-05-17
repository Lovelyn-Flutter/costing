const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

const connectDB = require(
  './config/db'
)

const quotationRoutes = require(
  './routes/quotationRoutes'
)

dotenv.config()

const app = express()

connectDB()

app.use(cors())

app.use(express.json())

app.use(
  express.static(
    path.join(
      __dirname,
      '../frontend'
    )
  )
)

app.use(
  '/api/quotations',
  quotationRoutes
)

app.get('/admin', (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      '../frontend/admin.html'
    )
  )
})

app.get('/review', (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      '../frontend/review.html'
    )
  )
})

app.get('/success', (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      '../frontend/success.html'
    )
  )
})

app.get('/', (req, res) => {
  res.sendFile(
    path.join(
      __dirname,
      '../frontend/index.html'
    )
  )
})

const PORT =
  process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  )
})