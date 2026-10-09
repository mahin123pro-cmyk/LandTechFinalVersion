// try{

// }catch(error){
//     res.status(404).json({
//         message:error.message
//     })
// }

import crypto from "crypto"

export const newdeedGenerate = async (req, res) => {

    try {
        const { ownerName, nid, district, upazila, khatianNo, dagNo, mouza, landArea, landUnit, registrationDate } = req.body
        const deedId = `LV-D-${crypto.randomBytes(8).toString("hex").toUpperCase()}`
        const deedWithOwner = {
            deedId: deedId,
            ownerName: ownerName,
            nid: nid,
            district: district,
            upazila: upazila,
            khatianNo: khatianNo,
            dagNo: dagNo,
            mouza: mouza,
            landArea: landArea,
            landUnit: landUnit,
            registrationDate: registrationDate
        }


        const deedWithoutOwner = {
            deedId: deedId,
            khatianNo: khatianNo,
            district: district,
            upazila: upazila,
            dagNo: dagNo,
            mouza: mouza,
            landArea: landArea,
            landUnit: landUnit,
            registrationDate: registrationDate
        }


        const canonocalDataDeedWithOwner = {
            deedId: deedWithOwner.deedId,
            ownerName: deedWithOwner.ownerName,
            nid: deedWithOwner.nid,
            district:deedWithOwner.district,
            upazila:deedWithOwner.upazila,
            khatianNo: deedWithOwner.khatianNo,
            dagNo: deedWithOwner.dagNo,
            mouza: deedWithOwner.mouza,
            landArea: Number(deedWithOwner.landArea),
            landUnit: deedWithOwner.landUnit,
            registrationDate: deedWithOwner.registrationDate
        }
        



        const canonocalDataDeedWithOutOwner = {
            deedId: deedWithoutOwner.deedId,
            khatianNo: deedWithoutOwner.khatianNo,
            district:deedWithoutOwner.district,
            upazila:deedWithoutOwner.upazila,
            dagNo: deedWithoutOwner.dagNo,
            mouza: deedWithoutOwner.mouza,
            landArea: Number(deedWithoutOwner.landArea),
            landUnit: deedWithoutOwner.landUnit,
            registrationDate: deedWithoutOwner.registrationDate
        }



    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}

