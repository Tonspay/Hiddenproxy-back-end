const kg = require('../../../modules/auth/index')

async function auth(req, res, next) {
  const token = req.headers.token;
  const authUser = await kg.getAuthKeyByKey(token);
  if (authUser) {
    res.locals.auth = authUser;
    next();
  } else {
    res.status(401).send({
        code:401,
        error:"Permission deny . Please check if API-KEY correct ."
    });
  }
}

exports.auth = auth;
