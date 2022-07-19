import { packagedb, Package } from "../../../../../Models/PackageModels";


export const CreatePackageDocument = async (userId: string, vendorName: string): Promise<{ state: boolean, message: string }> => {
    try {
        let create = new packagedb<Package>({
            vendorId: userId,
            vendorName: vendorName,
            package: []
        })
        const save = await create.save()
        if (!save) {
            return { state: false, message: 'vendor name has been registered' }
        }
        return { state: true, message: 'ok' }
    } catch (error: any) {
        return { state: false, message: error.toString() }

    }

}

export const AbortPackageDocument = async (vendorId: string): Promise<{ state: boolean, message: string }> => {
    try {
        const abort = await packagedb.deleteOne({ vendorId: vendorId })
        if (!abort) {
            return { state: false, message: 'something error' }
        }
        return { state: true, message: 'ok' }
    }
    catch (err: any) {
        return { state: false, message: err.toString() }
    }
}