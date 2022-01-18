import { Joi, joiValidate } from '../helpers/joiValidate';

/**
 * Validations
 *
 * @class Validations
 */
class Validations {
  /**
   * Metric validation
   *
   * @static
   * @param {*} req
   * @return {*}
   * @memberof Validations
   */
  static async validateMetric(req, res, next) {
    const payload = {
      ...req.body, ...req.query, ...req.params, ...req.headers,
    };
    const schema = Joi.object().keys({
      name: Joi.string().required()
        .messages({
          'string.pattern.base': 'name must be a string',
          'any.required': 'name is not allowed to be empty',
        }),
      value: Joi.number().required().messages({
        'string.pattern.base': 'value must be a number',
        'any.required': 'value is not allowed to be empty',
      }),
    });
    req.payload = await joiValidate(payload, schema);
    return next();
  }

  /**
   * Get Metric validation
   *
   * @static
   * @param {*} req
   * @return {*}
   * @memberof Validations
   */
  static async GetMetric(req, res, next) {
    const payload = {
      ...req.body, ...req.query, ...req.params, ...req.headers,
    };
    const schema = Joi.object().keys({
      name: Joi.string().optional().allow('', null)
        .messages({
          'string.pattern.base': 'name must be a string',
          'any.required': 'name is not allowed to be empty',
        }),
      page: Joi.number().optional().allow('', null),
      all: Joi.boolean().valid(true, false).optional().allow('', null),
      interval: Joi.string().valid('h', 'm', 'd').optional().allow('', null),
      avg: Joi.number().optional().allow('', null),
      start: Joi.number().optional().allow('', null),
    });
    req.payload = await joiValidate(payload, schema);
    return next();
  }
}

export default Validations;
