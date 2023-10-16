const express = require('express');
const UserService = require('../../controllers/auth-controller');
const isEmptyBody = require("../../middlewares/isEmptyBody");
const validateBody = require("../../decorators/validateBody");
const { userSignupSchema, userSigninSchema } = require('../../models/User');

const authRouter = express.Router();

const userSignupSchemaValidate = validateBody(userSignupSchema);
const userSigninSchemaValidate = validateBody(userSigninSchema);

authRouter.post('/users/register', isEmptyBody, userSignupSchemaValidate, UserService.signup);
authRouter.post('/users/login', isEmptyBody, userSigninSchemaValidate, UserService.signin);

module.exports = authRouter;