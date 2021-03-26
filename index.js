const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()

// congigure DB
mongoose
  .connect(process.env.DB_CON_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('DB Connected'))

// import auth routes
const authRoutes = require('./routes/auth')

const blogsRoutes = require('./routes/blogs')

const corsOptions = {}
// Middlewares
app.use(
  cors({
    origin: /http:\/\/localhost:4200\/*/,
    optionsSuccessStatus: 200,
    allowedHeaders: ['Access-Control-Allow-Headers', 'content-type', 'AUTH-TOKEN'],
    exposedHeaders: ['AUTH-TOKEN'],
  })
)
app.use(express.json())

// Route middlewares
app.use('/api/user', authRoutes)

app.use('/api/blog', blogsRoutes)

app.listen(PORT, () => console.log(`Express Server running at port ${PORT}`))
