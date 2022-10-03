import Connection from "../../../Utils/MessageBroker"

interface Data {
    userId:string,
    desc:string,
    date:Date
}

const AddNotification = async (userId:string, dataNotif:Data) => {
    dataNotif.date = new Date()
    try {
        const { connection, channel } = await Connection('notification')
        const data = {type:'add',data:{userId:userId,notif:dataNotif}}
        await channel.sendToQueue('notification', Buffer.from(JSON.stringify(data)))
        await channel.close()
        await connection.close()
    } catch (error) {
        throw error
    }
}
export default AddNotification