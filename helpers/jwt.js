const { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.SECRET;
  const api = process.env.API_URL
  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked : isRevoked,
  }).unless({
    path : [
      {url : /\api\/v1\/products(.*)/ , methods : ['GET' , 'OPTIONS']},
      {url : /\/public\/uploads(.*)/ , methods : ['GET' , 'OPTIONS']},
      {url : /\api\/v1\/categories(.*)/ , methods : ['GET' , 'OPTIONS']},
      "/api/v1/users/login/",
    ]
  });
}

async function isRevoked(req, jwt) {
  console.log(jwt.payload);
  const payload = jwt.payload
  if (payload.isAdmin == false) {
    console.log('Not Admin');
    return true;
  }
  console.log('Admin');
  return false;
}

module.exports = authJwt;