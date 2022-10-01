import mongoose from "mongoose"

interface PostItem {
    description: string,
    img: Array<string>,
    date: Date,
    like: [
        { userId: string }
    ],
    comment: [
        {
            userId: string,
            comment: string,
            date: Date
        }
    ]
}

interface PostingModels {
    userId: string,
    post: [PostItem]
}

const posting = new mongoose.Schema<PostingModels>({
    userId: { type: String, required: true },
    post: [
        {
            description: { type: String },
            img: [{ type: String }],
            like: [{ userId: { type: String } }],
            comment: [{ userId: { type: String }, comment: { type: String }, date: { type: Date } }],
            date: { type: Date }
        }

    ]
})


const PostingModels = mongoose.model('posting', posting)
export default PostingModels