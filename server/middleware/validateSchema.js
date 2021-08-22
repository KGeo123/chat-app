/**
 *
 * @param {{}} schema a validation schema generated by yup
 * @retruns a new middleware
 */
function validateSchema(schema) {
  return async (req, res, next) => {
    try {
      const isValid = await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      const newError = new Error('validation error');
      newError.statusCode = 400;
      newError.description = error.errors;
      next(newError);
    }
  };
}

export default validateSchema;