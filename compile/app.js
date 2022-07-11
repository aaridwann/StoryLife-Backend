"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require('dotenv').config();
const express_1 = __importDefault(require("express"));
// Route
const AuthRoute = require('./Routes/Auth/Auth');
const UsersRoute = require('./Routes/Users/UsersRoute');
const EventRoute = require('./Routes/Event/EventRoute');
const VendorRoute = require('./Routes/Vendor/VendorRoutes');
const BookingRoute = require('./Routes/Booking/BookingRoutes');
const PackageRoute = require('./Routes/Package/PackageRoute');
const BalanceRoute = require('./Routes/Balance/BalanceRoute');
const OrderRoute = require('./Routes/Order/OrderRoute');
const FollowRoute = require('./Routes/Follows/FollowRoute');
// 
// aggregate Route
const vendorAgregate = require('./Routes/Agregate/Vendors');
const port = process.env.PORT || 8000;
exports.app = (0, express_1.default)();
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const { connect } = require('./Connection Db/ConnectionDb');
var cors = require('cors');
exports.app.use(cookieParser());
var corsOptions = {
    credentials: true,
    // origin: 'http://192.168.100.13:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
connect();
exports.app.use(cors(corsOptions));
exports.app.use(bodyParser.json());
exports.app.use(express_1.default.json());
exports.app.listen(port, () => console.log('server is running http://192.168.100.13:' + port));
// Aggregate
exports.app.use('/api/vendor', vendorAgregate);
// Services
exports.app.get('/', (req, res) => {
    res.json('please use /api/(url)/');
});
exports.app.use('/auth', AuthRoute);
exports.app.use('/users', UsersRoute);
exports.app.use('/event', EventRoute);
exports.app.use('/vendor', VendorRoute);
exports.app.use('/booking', BookingRoute);
exports.app.use('/package', PackageRoute);
exports.app.use('/balance', BalanceRoute);
exports.app.use('/order', OrderRoute);
exports.app.use('/follow', FollowRoute);
