import { followDb } from "../../../Models/FollowModels"
import { Response } from 'express'

interface Request {
    user: {
        _id: string
    }
    params: {
        id: string
    }
}


// 1. check sudah follow atau belum !Complete
// 2. jika sudah return already follow !Complete
// 3. jika belum add to follow
// 4. jika gagal hapus kembali
// 5. jika berhasil tambah follower ke target
let failState = (message: string) => {
    return { state: false, message: message }
}
export const follow = async (req: Request, res: Response) => {

    if (!req.user._id || !req.params.id) {
        // return failState('id user or id params not found')
        return res.status(400).json({ state: false, message: 'id user or id params not found' })
    }

    // 1. Check following
    let check = await checkFollow(req.user._id, req.params.id)
    if (!check.state) {
        return res.status(400).json(check.message)
        // return failState(check.message)
    }

    // 2. Add to Following
    let addFollow = await addToFollow(req.user._id, req.params.id)
    if (!addFollow.state) {
        return res.status(500).json(addFollow.message)
        // return failState(addFollow.message)
    }

    // 3. Add to Follower
    let addFollower = await addToFollower(req.user._id, req.params.id)
    if (!addFollower.state) {
        // if Add to follower is failed do Cancel Following 
        await cancelFollowing(req.user._id, req.params.id)
        return res.status(500).json(addFollower.message)
        // return failState(addFollower.message)
    }

    return res.status(201).json({ state: true, message: 'success follow' })
}

// Children function


// 1. Check follow Function
export const checkFollow = async (idUser: string, idTarget: string) => {
    let res = await followDb.findOne({ userId: idUser }, { following: 1, _id: 0 })
    if (!res) {
        return { state: false, message: 'data is null' }
    }
    let check = res.following.map((x) => x._id).includes(idTarget)
    if (check) {
        return { state: false, message: 'you already follow' }
    } else {
        return { state: true, message: 'you not following him' }
    }
}

// 2. Add to Follow
export const addToFollow = async (idUser: string, idTarget: string) => {
    try {
        await followDb.updateOne({ userId: idUser }, { $push: { following: { _id: idTarget, timeStamps: Date.now() } } })
        return { state: true, message: 'success follow' }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}

// 3. Add Follower
export const addToFollower = async (idUser: string, idTarget: string) => {
    try {
        await followDb.updateOne({ userId: idTarget }, { $push: { follower: { _id: idUser, timeStamps: Date.now() } } })
        return { state: true, message: 'success add follower' }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}

// 4. Cancel Following
export const cancelFollowing = async (idUser: string, idTarget: string) => {
    try {
        await followDb.updateOne({ userId: idUser }, { $pull: { following: { _id: idTarget } } })
        return { state: true, message: 'following has ben canceled' }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}