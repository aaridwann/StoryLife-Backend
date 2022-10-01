import SuspenseModels from "../../../Models/SuspenseModels";

const CreateSuspenseDb = async (id: string) => {
    try {
        const create = await new SuspenseModels({ userId: id }).save()
        if (!create) return false
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export default CreateSuspenseDb