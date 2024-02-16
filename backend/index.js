const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcryptjs')

const app = express()
const PORT = process.env.PORT || 8000

app.use(bodyParser.json())
app.use(cors())

async function connectToMongoDB() {
  try {
    await mongoose.connect(
      'mongodb+srv://blabla:blabla@cluster0.i0uayfv.mongodb.net/',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

connectToMongoDB()

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const User = mongoose.model('User', userSchema)

app.post('/', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({ message: 'Invalid email or password' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.json({ message: 'Invalid email or password' })
    }

    res.json({ message: 'Login successful' })
  } catch (error) {
    console.error(error)
    res.json({ message: 'Internal server error' })
  }
})

app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.json({ message: 'Email already exists' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ email, password: hashedPassword })
    await newUser.save()

    res.json({ message: 'User created successfully' })
  } catch (error) {
    console.error(error)
    res.json({ message: 'Internal server error' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
