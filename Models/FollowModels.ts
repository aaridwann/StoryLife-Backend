import mongoose from 'mongoose'

export interface FollowModels {
    userId: string
    following: Array<{ _id: string, timeStamps: number }>
    follower: Array<{ _id: string, timeStamps: number }>
}
const follow = new mongoose.Schema<FollowModels>({
    userId: { type: String, required: true, unique: true },
    following: [{ _id: { type: String, unique: true }, timeStamps: { type: Number } }, { default: null }],
    follower: [{ _id: { type: String, unique: true }, timeStamps: { type: Number } }, { default: null }],
})

export const followDb = mongoose.model('follow', follow)