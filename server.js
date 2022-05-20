const express = require('express')
const connectDB = require('./config/db')
const app = express()

connectDB()

app.use(express.json({ extended: false }))

app.get('/',(req,res)=>res.send('API running'))

app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/seller', require('./routes/api/seller'))
app.use('/api/buyer', require('./routes/api/buyer'))


const PORT = process.env.PORT  || 8081;

app.listen(PORT, () => console.log(`server is active on port ${PORT}`))
