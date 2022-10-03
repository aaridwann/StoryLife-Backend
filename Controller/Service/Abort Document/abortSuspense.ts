import SuspenseModels from "../../../Models/SuspenseModels";

const AbortSuspenseDb = async (id: string) => {
    try {
        const res = await SuspenseModels.deleteOne({ userId: id })
        if (res.deletedCount) {
            return { state: true, message: 'abort suspense is success' }
        } else {
            return { state: false, message: 'abort suspense is failed' }
        }
    } catch (error: any) {
        return { state: false, message: error.toString() }
    }
}

export default AbortSuspenseDb