

export const verifyEmail=({email,token})=>{
    const appName =  "Authentication App";
const baseUrl ="http://localhost:5173";
const verifyUrl = `${baseUrl.replace(/\/+$/, "")}/token/${encodeURIComponent(
token

)}`
const html=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<p>Your verification token:</p>
<p>Click the link:</p>
    <p> ${verifyUrl}</p>
</body>
</html>`
return html
}
