import jwt from 'jsonwebtoken';

/**
 *
 * @param {object} payload the payload to be attached on the jwt
 * @returns {string} a newely generated jwt with 5 minutes of expiration time
 */
export function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '5m'
  });
}

/**
 *
 * @param {string} userId users id generated by mongoose
 * @returns a newely generated jwt for retrieving a new access token expires in 1 week
 */
export function generateRefreshToken(userId) {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '1w'
  });
}