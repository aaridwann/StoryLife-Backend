"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetVendors = void 0;
const VendorsModels_1 = require("../../../../Models/VendorsModels");
const GetVendors = async (x, res) => {
    let response = await VendorsModels_1.vendor.aggregate([
        // Lookup Package
        {
            $lookup: {
                from: 'packagelists',
                localField: 'vendorId',
                foreignField: 'vendorId',
                as: 'Package'
            }
        },
        // addField UserId
        { $addFields: { userId: '$vendorId' } },
        // lookup follow
        {
            $lookup: {
                from: 'follows',
                localField: 'userId',
                foreignField: 'userId',
                as: 'Follow'
            }
        },
        // Match
        { $match: { $or: [{ vendorId: x.id }, { name: x.name }, { category: x.category }] } },
        // unwind
        { $unwind: { path: '$Follow', preserveNullAndEmptyArrays: true } },
        // Proyeksi
        {
            $project: {
                _id: '$vendorId',
                name: '$name',
                address: '$address',
                category: '$category',
                phone: ['$phone1', '$phone2'],
                package: '$Package.package',
                follow: { following: '$Follow.following', follower: '$Follow.follower' }
            }
        }
    ]);
    if (response[0] === undefined) {
        return null;
    }
    else {
        // return console.log(res)
        return response;
    }
};
exports.GetVendors = GetVendors;
