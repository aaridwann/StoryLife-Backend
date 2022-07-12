require('dotenv').config()
import express, { Response } from 'express'
import { downloadFile } from './Controller/Service/upload/accessData'
import { uploadBasic, upload } from './Controller/Service/upload/upload'
// Route
const AuthRoute = require('./Routes/Auth/Auth')
const UsersRoute = require('./Routes/Users/UsersRoute')
const EventRoute = require('./Routes/Event/EventRoute')
const VendorRoute = require('./Routes/Vendor/VendorRoutes')
const BookingRoute = require('./Routes/Booking/BookingRoutes')
const PackageRoute = require('./Routes/Package/PackageRoute')
const BalanceRoute = require('./Routes/Balance/BalanceRoute')
const OrderRoute = require('./Routes/Order/OrderRoute')
const FollowRoute = require('./Routes/Follows/FollowRoute')
// 
// aggregate Route
const vendorAgregate = require('./Routes/Agregate/Vendors')



const port = process.env.PORT || 8000
export const app = express()
const cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
const { connect } = require('./Connection Db/ConnectionDb')
var cors = require('cors')
app.use(cookieParser())
var corsOptions = {
  credentials: true,
  // origin: 'http://192.168.100.13:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}
connect()
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(express.json())
app.listen(port, () => console.log('server is running http://192.168.100.13:' + port))


// Aggregate
app.use('/api/vendor', vendorAgregate)



// Services
app.post('/', upload, uploadBasic)
app.get('/', downloadFile)


app.use('/auth', AuthRoute)
app.use('/users', UsersRoute)
app.use('/event', EventRoute)
app.use('/vendor', VendorRoute)
app.use('/booking', BookingRoute)
app.use('/package', PackageRoute)
app.use('/balance', BalanceRoute)
app.use('/order', OrderRoute)
app.use('/follow', FollowRoute)