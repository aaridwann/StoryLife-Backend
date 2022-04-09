require('dotenv').config()
import express from 'express'
// Route
const AuthRoute = require('./Routes/Auth/Auth')
const UsersRoute = require('./Routes/Users/UsersRoute')
const ProjectRoute = require('./Routes/Project/ProjectRoute')
const VendorRoute = require('./Routes/Vendor/VendorRoutes')

const port = process.env.PORT
const app = express()
const cookieParser = require('cookie-parser')
const { connect } = require('./Connection Db/ConnectionDb')
connect()
app.use(express.json())
app.use(cookieParser())
app.listen(port, () => console.log('server is running http://192.168.100.13:' + port))



app.use('/auth', AuthRoute)
app.use('/users', UsersRoute)
app.use('/project', ProjectRoute)
app.use('/vendor', VendorRoute)