import { validateAccessToken } from '../lib/tokens.js';
import { throwError } from '../lib/errors.js';

function isAuth(req, res, next) {
  const accessToken = req.get('Authorization')?.split(' ')[1];
  console.log(accessToken);
  if (!accessToken) {
    throwError('you are not authorized', 401);
  }
  try {
    const payload = validateAccessToken(accessToken);
    req.user = {
      username: payload.username,
      userId: payload.userId,
      email: payload.email
    };
    console.log(req.user);
    next();
  } catch (error) {
    throwError('you are not authorized', 401);
  }
}

export default isAuth;
