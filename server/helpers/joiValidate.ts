import JoisBase from '@hapi/joi';
import JoiDate from '@hapi/joi-date';
import { customError, BAD_REQUEST } from 'request-response-handler';

export const Joi = JoisBase.extend(JoiDate);

/**
 * Validate request body
 *
 * @param {object} payload
 * @param {object} res
 * @param {object} next
 * @param {object} schema
 */
export const joiValidate = (payload, schema, req, res, next) => {
  const { error, value } = schema.validate(payload, {
    allowUnknown: true,
  });

  // TODO check for validation error
  if (error) {
    const errors = error.details.map((current) => current.message.replace(/['"]/g, ''));
    return next(
      customError({ status: BAD_REQUEST, message: errors[0] }),
    );
  }

  return value;
};
