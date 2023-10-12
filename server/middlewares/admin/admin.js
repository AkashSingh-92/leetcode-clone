const jwt = require("jsonwebtoken");

const Admin_Secret_key = "4DMIN_S3CR3T_k3y";

// jwt token genration for admins
function adminjwt(username) {
  const payload = {
    username: username,
    role: "admin",
  };
  const generatedToken = jwt.sign(payload, Admin_Secret_key, {
    expiresIn: "1h",
  });
  return generatedToken;
}

function adminAuth(req, res, next) {
  const authorization = req.headers.authorization;

  // checking whether the Authorization exists or not and also checking that bearer exists otherwise while splitting we might run into an error
  if (!authorization || !authorization.startsWith("bearer ")) {
    return res.status(401).send({ message: "User is not authorized" });
  }
  const jwtToken = authorization.split(" ")[1];

  jwt.verify(jwtToken, Admin_Secret_key, (err, user) => {
    if (err) {
      return res.status(401).send({ message: "User is not authorized" });
    } else {
      req.user = user;
      next();
    }
  });
}


module.exports = {adminjwt, adminAuth}