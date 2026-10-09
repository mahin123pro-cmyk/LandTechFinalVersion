import crypto from "crypto"


export const generateHash=(data)=>{
    const dataString=JSON.stringify(data);

    return crypto.createHash("sha256").update(dataString).digest("hex")

}