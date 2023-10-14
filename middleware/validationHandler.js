const asycnHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validation = asycnHandler(async (req, res, next) => {
  let token;
  let autherheader =  req.headers.Authorization || req.headers.authorization;


  if (autherheader) {
    token = autherheader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        return  res.status(401).send("user is not login yet")
      }
      req.user = decoded.user;
      next();
    });
  }
  else{
    console.log(`not auth header`);
  }
});

module.exports = validation;
