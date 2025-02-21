const { expressjwt: jwt } = require("express-jwt");


function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return jwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/public\/uploads(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/categories(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/orders(.*)/,methods: ['GET', 'OPTIONS', 'POST']},
            `${api}/users/login`,
            `/api/v1/users/register`,
        ]
    })
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



module.exports = authJwt
