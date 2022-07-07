import { verify } from "../../MiddleWare/TokenMiddleware"
import { getFollow } from '../../Controller/Service/Follow/getFollow'
import { follow } from "../../Controller/Service/Follow/Follow"
import { unfollow } from "../../Controller/Service/Follow/Unfollow"
const route = require('express').Router()



route.get('/', verify, getFollow)
route.post('/', verify, follow)
route.delete('/', verify, unfollow)

module.exports = route

