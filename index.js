const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()

// congigure DB
mongoose.connect(process.env.DB_CON_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
  console.log('DB Connected')
)

// import auth routes
const authRoutes = require('./routes/auth')

const postsRoutes = require('./routes/posts')

// Middlewares
app.use(express.json())

// Route middlewares
app.use('/api/user', authRoutes)

app.use('/api/posts', postsRoutes)

app.listen(PORT, () => console.log(`Express Server running at port ${PORT}`))
