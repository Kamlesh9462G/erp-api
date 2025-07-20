const Joi = require("joi");

const addRole = {
  body: Joi.object().keys({
    role_name: Joi.string().required().max(50),
    slug: Joi.string()
      .required()
      .max(50)
      .regex(/^[a-z0-9_]+$/),
    description: Joi.string().max(255).optional().allow(""),
  }),
};

const getRoles = {
  query: Joi.object().keys({
    role_name: Joi.string().optional(),
    slug: Joi.string().optional(),
    page: Joi.number().optional(),
    limit: Joi.number().optional(),
    sortBy: Joi.string().optional(),
  }),
};

const getRole = {
  params: Joi.object().keys({
    role_id: Joi.number().required(),
  }),
};

const updateRole = {
  params: Joi.object().keys({
    role_id: Joi.number().required(),
  }),
  body: Joi.object().keys({
    role_name: Joi.string().max(50).optional(),
    slug: Joi.string()
      .max(50)
      .regex(/^[a-z0-9_]+$/)
      .optional(),
    description: Joi.string().max(255).optional().allow(""),
  }),
};

const deleteRole = {
  params: Joi.object().keys({
    role_id: Joi.number().required(),
  }),
};

module.exports = {
  addRole,
  getRoles,
  getRole,
  updateRole,
  deleteRole,
};
