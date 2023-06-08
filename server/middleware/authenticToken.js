const jwt = require("jsonwebtoken");

function authenticToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1];

  // If token is not found in Authorization header, check cookies
  if (!token) {
    token = req.cookies.token;
  }

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log("JWT verification failed: ", err);
      return res.sendStatus(403);
    }
    req.email = user.email;
    console.log("userID set on req object: ", req.email);
    next();
  });
}

module.exports = authenticToken;
