/**
 * Creates a custom error and throws it
 * @param {string} message message to be included in the message field of the error
 * @param {number} statusCode http status code to be included in the statusCode field of the error, defaults to 500
 */
export function throwError(
  message = 'internal server error',
  statusCode = 500
) {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
}
