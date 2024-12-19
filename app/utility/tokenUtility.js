const jwt = require("jsonwebtoken");
const jwt_secret = "ABC545216355212345";
const jwt_expire = "6h";

const tokenEncode = (phoneNumber,user_id)=>{
    let expire = { expiresIn: jwt_expire}
    let payload = {phoneNumber:phoneNumber,user_id:user_id};

    return jwt.sign(payload,jwt_secret,expire);
}

const tokenDecode = (token)=>{
    try {
        return jwt.verify(token,jwt_secret);
    } catch (error) {
        return res.json({error: error})
    }
}

module.exports ={
    tokenEncode,
    tokenDecode
}