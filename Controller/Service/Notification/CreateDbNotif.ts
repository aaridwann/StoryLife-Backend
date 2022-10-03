import Connection from "../../../Utils/MessageBroker"

const CreateNotifDb = async (userId: string) => {
    try {
        const { connection, channel } = await Connection('notification')
        const data = {type:'create',data:{userId}}
        await channel.sendToQueue('notification', Buffer.from(JSON.stringify(data)))
        await channel.close()
        await connection.close()
    } catch (error) {
        throw error
    }
}
export default CreateNotifDb