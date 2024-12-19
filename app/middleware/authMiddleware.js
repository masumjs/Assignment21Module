const {tokenDecode} = require("../utility/tokenUtility.js");
const authMiddleware = (req, res, next) => {
  try {

    const token = req.cookies.token;
  
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = tokenDecode(token);
    if(decoded == "null"){
      return res.status(404).json({ message: "Token decode failed" });
    }else{
    
      let phoneNumber = decoded.phoneNumber;
      let user_id = decoded.user_id;

      req.headers.phoneNumber = phoneNumber;
      req.headers.user_id = user_id;

      next();

    }


  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
