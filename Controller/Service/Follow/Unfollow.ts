/*
1. remove following from user
2. remove follower in target,
3. if fail back follow to target
*/
import { Response } from "express";
import { followDb } from "../../../Models/FollowModels";
interface Request {
    user: {
        _id: string
    },
    params: {
        id: string
    }
}

//message 
const msg = (msg: string) => {
    return { state: false, message: msg }
}

export const unfollow = async (req: Request, res: Response) => {
    if (req.params.id) {
        return res.status(400).json({ state: false, message: 'request params id not found' })
    }
    else if (req.user._id) {
        return res.status(500).json({ state: false, message: 'request user _id not found' })
    }



    
    // 1. remove following
    const remove: { state: boolean, message: string } = await removeFollowing(req.user._id, req.params.id)
    if (!remove.state) {
        return res.status(400).json(remove.message)
    }

    // 2. Remove follower from id target
    const removeFollowers: { state: boolean, message: string } = await removeFollower(req.user._id, req.params.id)
    if (!removeFollowers.state) {
        // if remove follower is fail than back to following
        await followBack(req.user._id, req.params.id)
        return res.status(400).json(removeFollowers.message)
    }
    else {
        return res.status(201).json('success unfollowed')
    }
}


// 1. Remove following
export const removeFollowing = async (idUser: string, idTarget: string): Promise<{ state: boolean, message: string }> => {
    try {
        let res = await followDb.updateOne({ userId: idUser }, { $pull: { following: { _id: idTarget } } })
        if (!res.matchedCount) {
            return msg('user not found');
        }
        else if (!res.modifiedCount) {
            return msg('unfollow failed');
        }
        return { state: true, message: 'ok' };
    } catch (error: any) {
        return msg(error.toString());
    }
}
// 2. Remove Follower on target
export const removeFollower = async (idUser: string, idTarget: string): Promise<{ state: boolean, message: string }> => {
    try {
        let res = await followDb.updateOne({ userId: idTarget }, { $pull: { follower: { _id: idUser } } })
        if (!res.matchedCount) {
            return msg('user not found')
        } else if (!res.modifiedCount) {
            return msg('remove follower is failed')
        }
        return { state: true, message: 'ok' }
    } catch (error: any) {
        return msg(error.toString())
    }

}
// 3. When follow back is fail
export const followBack = async (idUser: string, idTarget: string): Promise<{ state: boolean, message: string }> => {
    try {
        let res = await followDb.updateOne({ userId: idUser }, { $push: { following: { _id: idTarget, timeStamps: Date.now() } } })
        if (!res.modifiedCount) {
            return msg('following back is fail')
        }
        return { state: true, message: 'following back is success' }
    } catch (error: any) {
        return msg(error.toString())
    }
}