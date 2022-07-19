import { Response } from "express";
import { userDb } from "../../../Models/UsersModels";
import { abortBallance } from "../Abort Document/abortBallance";
import { abortBooking } from "../Abort Document/abortBooking";
import { abortEvent } from "../Abort Document/abortEvent";
import { abortFollow } from "../Abort Document/abortFollow";
import { abortUser } from "../Abort Document/abortUser";
import { CreateBallanceAccount } from "../Create Document/CreateBallanceAccount";
import { CreateBookingDocument } from "../Create Document/CreateBookingDocument";
import { CreateEventDocument } from "../Create Document/CreateEventDocument";
import { CreateFollowDb } from "../Create Document/CreateFollowDb";

const bcrypt = require('bcrypt');

interface RequestRegisterInterface {
    body: {
        email: string
        name: string
        password: string
    }
}

interface Validator {
    state: boolean,
    message: string
}
export const RegisterService = async (req: RequestRegisterInterface, res: Response) => {
    // Validator
    let validator = await validationRequest(req.body)
    if (!validator.state) {
        return res.status(400).json(validator.message)
    }

    // Hasing password
    let password = await hashingPassword(req.body.password)

    // Change password with hashing password & Trim name from body
    req.body.password = password
    req.body.name = req.body.name.trim().toLowerCase()

    // input userDb
    try {
        let create = new userDb(req.body)
        let exec = await create.save()
        if (!exec) {
            return res.status(400).json('gagal')
        }

        // Create Additional Db
        let createDocs = await CreateAdditionalDb(req.body.email, req.body.name)

        // If create additional Failed  cancel all in create
        if (createDocs.state === false) {
            const abort = await abortRegister(createDocs.id)
            return res.status(400).json({ state: false, message: 'Regiter failed', logs: abort.message })
        }

        return res.status(201).json({ state: true, message: 'registered success' })

    } catch (error) {
        return res.status(500).json(error)
    }

}

const validationRequest = async (req: RequestRegisterInterface['body']): Promise<Validator> => {
    let { email, password, name } = req
    // init data
    if (!email || !password || !name) {
        return { state: false, message: 'check input data' }
    }
    // check length password
    if (password.toString().length < 5) {
        return { state: false, message: 'password minimum 5 character' }
    }
    // check already email
    let res = await userDb.findOne({ email: email })
    if (res) {
        return { state: false, message: 'email already used' }
    } else {
        return { state: true, message: 'ok' }
    }

}

const hashingPassword = async (password: string): Promise<string> => {
    let salt = 15
    let hashingPassword = await bcrypt.hash(password.toString(), salt)
    return hashingPassword
}

const CreateAdditionalDb = async (email: string, username: string): Promise<boolean | any> => {
    let id: any = await userDb.findOne({ email: email })
    if (!id) {
        return { state: false, message: 'data not found' }
    }
    id = id._id.toString()

    let event = await CreateEventDocument(id, username)
    let ballance = await CreateBallanceAccount(id, email, username)
    let follow = await CreateFollowDb(id, username)
    let booking = await CreateBookingDocument(id, username)

    if (!ballance || !follow || !event || !booking) {
        return { state: false, id: id }
    }
    return { state: true, message: 'ok' }
}

export const abortRegister = async (id: string) => {
    let ballance = await abortBallance(id);
    let user = await abortUser(id);
    let event = await abortEvent(id);
    let follow = await abortFollow(id);
    let booking = await abortBooking(id);
    if (!ballance || !user || !event || !follow || !booking) {
        console.log({ ballance: ballance, follow: follow, event: event, booking: booking });
        return {
            state: false, message: {
                user: user.message,
                ballance: ballance.message,
                event: event.message,
                follow: follow.message,
                booking: booking.message
            }
        };
    }
    else {
        return { state: true, message: 'all document success abort' };
    }
}