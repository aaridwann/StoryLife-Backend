require('dotenv').config()
import express from 'express'
// Route
const AuthRoute = require('./Routes/Auth/Auth')
const UsersRoute = require('./Routes/Users/UsersRoute')
const ProjectRoute = require('./Routes/Project/ProjectRoute')
const VendorRoute = require('./Routes/Vendor/VendorRoutes')
const BookingRoute = require('./Routes/Booking/BookingRoutes')
const PackageRoute = require('./Routes/Package/PackageRoute')
const BalanceRoute = require('./Routes/Balance/BalanceRoute')
// 
// aggregate Route
const vendorAgregate = require('./Routes/Agregate/Vendors')



const port = process.env.PORT
const app = express()
const cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
const { connect } = require('./Connection Db/ConnectionDb')
var cors = require('cors')
var corsOptions = {
  origin: 'http://192.168.100.13:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
connect()
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.listen(port, () => console.log('server is running http://192.168.100.13:' + port))

// Aggregate

app.use('/api/vendor', vendorAgregate)

// Services

app.use('/auth', AuthRoute)
app.use('/users', UsersRoute)
app.use('/project', ProjectRoute)
app.use('/vendor', VendorRoute)
app.use('/booking', BookingRoute)
app.use('/package', PackageRoute)
app.use('/balance', BalanceRoute)