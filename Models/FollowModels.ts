import mongoose from 'mongoose'

export interface FollowModels {
    userId: string
    following: Array<{ _id: string, timeStamps: number }>
    follower: Array<{ _id: string, timeStamps: number }>
}
const follow = new mongoose.Schema<FollowModels>({
    userId: { type: String, required: true, unique: true },
    following: [{ _id: { type: String }, timeStamps: { type: Number } }],
    follower: [{ _id: { type: String }, timeStamps: { type: Number } }]
})

export const followDb = mongoose.model('follow', follow)