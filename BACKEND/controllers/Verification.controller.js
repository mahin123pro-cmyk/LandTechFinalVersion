// try{

// }catch(error){
//     res.status(404).json({
//         message:error.message
//     })
// }

import crypto from "crypto"
import { generateHash } from "../utils/generateHash.js"
import { deedModel } from "../models/deedModel.js"

export const deedVerification = async (req, res) => {

    try {
        const { deedId,ownerName, nid, district, upazila, khatianNo, dagNo, mouza, landArea, landUnit, registrationDate } = req.body

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
            district: deedWithOwner.district,
            upazila: deedWithOwner.upazila,
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
            district: deedWithoutOwner.district,
            upazila: deedWithoutOwner.upazila,
            dagNo: deedWithoutOwner.dagNo,
            mouza: deedWithoutOwner.mouza,
            landArea: Number(deedWithoutOwner.landArea),
            landUnit: deedWithoutOwner.landUnit,
            registrationDate: deedWithoutOwner.registrationDate
        }



        const deedHash = generateHash(canonocalDataDeedWithOutOwner)
        const ownerWithDeedHash = generateHash(canonocalDataDeedWithOwner)


        const deed=await deedModel.findOne({deedId:deedId})
    
        if(!deed){
       return res.status(400).json({
            message:"Deed ID NOT found",
            success:false

        })
        }


      const ownerNameVerification=deed.currentOwner.name=== ownerName
      const nidVerfication =deed.currentOwner.nid ===nid
const districtVerification=deed.district ===district
const upazilaVerification =deed.upazila ===upazila
const khatianNoVerification =deed.khatianNo === khatianNo
const dagNoVerification=deed.dagNo === dagNo
const mouzaVerification =deed.mouza===mouza
const landAreaVerification=deed.landArea===Number(landArea)
const landUnitVerification =deed.landUnit===landUnit
const registrationDateVerification=deed.registrationDate===registrationDate
const documentHashVerification=deed.documentHash===deedHash
const ownerWithDeedHashVerification=deed.ownerWithDeedHash===ownerWithDeedHash






if( ownerNameVerification && nidVerfication && districtVerification && upazilaVerification && khatianNoVerification
    && dagNoVerification && mouzaVerification && landAreaVerification && landUnitVerification && registrationDateVerification 
    && documentHashVerification && ownerWithDeedHashVerification
){

  return  res.status(200).json({
        message:deed.deedId,
        message2:"All documment is verified"
    })
}






const fakeData=[{originalOwnerName:deed.currentOwner.name,fakeOwnerName:ownerName,success:ownerNameVerification},
    {originalOwnerNid: deed.currentOwner.nid,fakeOwnerNid:nid,success:nidVerfication },
    {originalDistrict:deed.district,fakeDistrict:district,success:districtVerification},
    {originalUpazila   :deed.upazila    ,fakeUpazila :upazila  ,success:upazilaVerification },
    {originalkhatianNo :deed.khatianNo  ,fakekhatianNo:khatianNo  ,success:khatianNoVerification },
    {originaldagNo :deed.dagNo  ,fakedagNo  :dagNo  ,success:dagNoVerification },
    {originalmouza :deed.mouza  ,fakemouza  :mouza  ,success:mouzaVerification  },
    {originallandArea :deed.landArea  ,fakelandArea  :landArea  ,success:landAreaVerification },
    {originallandUnit :deed.landUnit  ,fakelandUnit  :landUnit  ,success:landUnitVerification },
    {originalregistrationDate :deed.registrationDate ,fakeregistrationDate  :registrationDate  ,success:registrationDateVerification },
    {original :deed.documentHash  ,fake  :deedHash ,success:documentHashVerification },
    {original :deed.ownerWithDeedHash  ,fake  :ownerWithDeedHash ,success:ownerWithDeedHashVerification },
]
let verified=0;
let unverified=0;

fakeData.forEach((e)=>{
    if(e.success==true){
        verified++
    }else{
        unverified++
    }
})

return res.status(201).json({
    message:fakeData,
    messageVerified:{
verified,
unverified
    }
})




        // const data = await deedModel.create({
        //     deedId: deedId,
        //     currentOwner: {
        //         name: ownerName,
        //         nid: nid,
        //     },
        //     district:district,
        //     upazila:upazila,
        //     khatianNo: khatianNo,
        //     dagNo: dagNo,
        //     mouza: mouza,
        //     landArea: landArea,
        //     landUnit: landUnit,
        //     registrationDate: registrationDate,
        //     documentHash: deedHash,
        //     ownerWithDeedHash: ownerWithDeedHash,
        //     ownershipHistory: [{
        //         ownerName,
        //         nid,
        //         fromDate: registrationDate,
        //         toDate: null,
        //         transferDocumentNo: deedId,
        //         transferHash: ownerWithDeedHash
        //     }]


        // })




    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }


}

