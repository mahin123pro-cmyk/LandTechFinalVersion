import { deedModel } from "../models/deedModel.js";
import { generateHash } from "../utils/generateHash.js";
import crypto from "crypto"


export const deedtransfer = async (req, res) => {

    try {

        const { deedId, previousOwnerNid, newOwnerName, newOwnerNid, transferDate, transferDocumentNo } = req.body;
        const deed = await deedModel.findOne({ deedId });
        if (!deed) {
            return res.status(400).json({ message: "Deed not found" });
        }

        if (deed.currentOwner.nid !== previousOwnerNid) {
            return res.status(400).json({ message: " Owner does not match" });
        }

        const currentHistory = deed.ownershipHistory[0];
        if (currentHistory) {
            currentHistory.toDate = transferDate
        }

        const transferId = `TR-${crypto.randomBytes(6).toString("hex").toUpperCase()}`
        const transferData = {
            deedId,
            previousOwnerNid,
            newOwnerName,
            newOwnerNid,
            transferDate,

            transferDocumentNo,
            transferId
        }


        const transferHash = generateHash(transferData)
        deed.ownershipHistory.unshift({
            ownerName: newOwnerName,
            nid: newOwnerNid,
            fromDate: transferDate,
            toDate: null,

            transferDocumentNo,
            transferHash
        })




        const newOwnerData = {
            deedId: deed.deedId,
            ownerName: newOwnerName,
            nid: newOwnerNid,
            district: deed.district,
            upazila: deed.upazila,
            khatianNo: deed.khatianNo,
            dagNo: deed.dagNo,
            mouza: deed.mouza,
            landArea: Number(deed.landArea),
            landUnit: deed.landUnit,
            registrationDate: deed.registrationDate
        };


    deed.ownerWithDeedHash = generateHash(newOwnerData);

    deed.currentOwner = {
    name: newOwnerName,
    nid: newOwnerNid
    };

    await deed.save();

    return res.status(200).json({
    message:"Owner ship transfer successfull"
   })



    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}