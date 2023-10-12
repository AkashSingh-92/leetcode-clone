const jwt = require("jsonwebtoken");

const User_Secret_key = "US3R_S3CR3T_k3y" ;

// jwt token genration for users
function userjwt(username){
  const payload = {
    username : username,
    role : "user"
  }
  const generatedToken = jwt.sign(payload, User_Secret_key, {expiresIn:"1h"})
  return generatedToken;
}

function userAuth(req, res, next){
  const authorization = req.headers.authorization;

  // checking whether the Authorization exists or not and also checking that bearer exists otherwise while splitting we might run into an error
  if ( !authorization || !authorization.startsWith("bearer ")){
    return res.status(401).send({message : "User is not authorized"})
  }
  const jwtToken = authorization.split(' ')[1];

  jwt.verify(jwtToken, User_Secret_key, (err , user) => {
    if (err){
      return res.status(401).send({message : "User is not authorized"})
    }else{
      req.user = user
      next()
    }
  })
}

module.exports = { userjwt, userAuth}