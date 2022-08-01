const expressJWT = require("express-jwt");

function authJWt() {
  const secret = process.env.secret || "my-app-secrets";

  return expressJWT.expressjwt({
    secret,
    algorithms: ["HS256"],
  });
  // .unless({
  //   path: [
  //     { url: `/\/public\/uploads(.*)/`, methods: ["GET", "OPTIONS"] },
  //     { url: `/\/api\/v1\/product(.*)/`, methods: ["GET", "OPTIONS"] },
  //     { url: `/\/api\/v1\/categories(.*)/`, methods: ["GET", "OPTIONS"] },
  //     `${api}/users/login`,
  //     `${api}/users/register`,
  //   ],
  // });
}

function errorHandler(err, req, res, next) {
  //UnauthorizedError
  if (err?.name === "UnauthorizedError") {
    return res
      ?.status(500)
      ?.json({ error: err, message: "user is not authorized" });
  }
  if (err?.name === "ValidationError") {
    //ValidationError
    return res?.status(401)?.json({ error: err, message: "Validation Error" });
  }
  return res?.status(500)?.json(err);
}
module.exports = { authJWt, errorHandler };
// module.exports = ;
