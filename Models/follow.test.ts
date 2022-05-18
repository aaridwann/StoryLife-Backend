import { ObjectId } from "mongodb";
let url = 'mongodb://localhost:27017/StoryLife'
var { mongoose } = require("mongoose");
const { followDb } = require("./FollowModels");
const { users } = require('./UsersModels')


interface Input {
    userId: string
    idTarget: string
}

// Get Follow Function
async function getFollow(id: string, method: 1 | 2 | 3) {
    let met ;
    if (method == 1) {
        met = { following: 1 }
    } else if (method == 2) {
        met = { follower: 1 }
    } else{
        met = {following:1 ,follower:1}
    }

    try {
        let res = await followDb.findOne({ userId: id }, { _id: 0, userId: 1, ...met })
        return console.log(res)
    } catch (error) {
        return console.log(error)
    }
}

// Following function

async function following(x: Input) {
    if (!x.idTarget || !x.userId) {
        return console.log('userId  atau idTarget tidak ada')
    }
    // Verify 1 
    let verify1 = await users.find({ $or: [{ _id: x.userId }, { _id: x.idTarget }] })
    if (verify1[1] == undefined) {
        return console.log('users not found')
    }
    // verify 2
    let verify2 = await followDb.findOne({ userId: x.userId, 'following._id': { $in: [x.idTarget] } })
    if (verify2) {
        return console.log('you already follow ')
    }

    // Push Proccess
    try {
        let follow1 = await followDb.updateOne({ userId: x.userId }, { $push: { following: { _id: new ObjectId(`${x.idTarget}`), timeStamps: Date.now() } } })
        let follow2 = await followDb.updateOne({ userId: x.idTarget }, { $push: { follower: { _id: new ObjectId(`${x.userId}`), timeStamps: Date.now() } } })
        if (follow1.modifiedCount == 1 && follow2.modifiedCount == 1) {
            return console.log({ message: 'Proccess Follow Success', data: follow1, follow2 })
        } else {
            return console.log({ message: 'Something error', data: follow1, follow2 })

        }
    } catch (error) {
        return console.log(error)
    }


}
// Follower function
async function unFollow(x: Input) {
    if (!x.idTarget || !x.userId) {
        return console.log('harap isi userId  atau idTarget')
    }
    //verify 1 
    let verify1 = await followDb.find({ $or: [{ userId: x.userId }, { userId: x.idTarget }] })
    if (verify1[1] == undefined) {
        return console.log('userId atau idTarget tidak ditemukan')
    }
    // verify 2
    let verify2 = await followDb.find({ userId: x.userId, 'following._id': { $in: [x.idTarget] } })
    if (verify2[0] == undefined) {
        return console.log('you not follow him')
    }
    // pull Proccess
    try {
        let pull1 = await followDb.updateOne({ userId: x.userId }, { $pull: { following: { _id: new ObjectId(`${x.idTarget}`) } } })
        let pull2 = await followDb.updateOne({ userId: x.idTarget }, { $pull: { follower: { _id: new ObjectId(`${x.userId}`) } } })
        if (pull1.modifiedCount == 1 && pull2.modifiedCount == 1) {
            return console.log({ message: 'Process unfollow Success', data: pull1, pull2 })
        } else {
            return console.log({ message: 'Something error', data: pull1, pull2 })
        }
    } catch (error) {
        return console.log(error)
    }
}


let input: Input = {
    userId: '625acf909f5986c218a0260a',
    idTarget: '625b06a2fa640f4f685f2037'
}
let inputNotFollow: Input = {
    userId: '625acf909f5986c218a0260a',
    idTarget: '625b06a2fa640f4f685f2037'
}
let inputfalse: Input = {
    userId: '625acf909f5986c218a0260c',
    idTarget: '625ad1f028e8cd8520fec38a'
}
let inputnull: Input = {
    userId: '',
    idTarget: ''
}
let result = {
    userId: '625acf909f5986c218a0260a',
    following: [{ _id: '625ad1f028e8cd8520fec38a', timeStamps: 1652798965268 }],
    _id: new ObjectId("6283b5f5fc5183e46f7d8ddd"),
    follower: []
}

test('Get Follower by id and ,method', async () => {
    await getFollow('625acf909f5986c218a0260a', 1)
    await getFollow('625b06a2fa640f4f685f2037', 2)
    await getFollow('625b06a2fa640f4f685f2037', 3)
})

// test('test Following', async () => {
//     await following(input)
//     await following(inputNotFollow)
//     await following(inputfalse)
//     await following(inputnull)
// })



// test('unfollow Function', async () => {
//     await unFollow(input)
//     await unFollow(inputNotFollow)
//     await unFollow(inputfalse)
//     await unFollow(inputnull)
// })


beforeAll(async () => {
    await mongoose.connect(url)
})
afterAll(async () => {
    await mongoose.connection.close()
})

// db.follows.insertOne({userId:'625acf909f5986c218a0260a',following:[],follower:[]})