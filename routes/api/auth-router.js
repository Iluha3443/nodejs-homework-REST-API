const express = require('express');
const UserService = require('../../controllers/auth-controller');
const isEmptyBody = require("../../middlewares/isEmptyBody");
const validateBody = require("../../decorators/validateBody");
const { userSignupSchema, userSigninSchema } = require('../../models/User');
const authenticate = require('../../middlewares/authenticate')

const authRouter = express.Router();

const userSignupSchemaValidate = validateBody(userSignupSchema);
const userSigninSchemaValidate = validateBody(userSigninSchema);

authRouter.post('/users/register', isEmptyBody, userSignupSchemaValidate, UserService.signup);

authRouter.post('/users/login', isEmptyBody, userSigninSchemaValidate, UserService.signin);

authRouter.get('/users/current', authenticate, UserService.getCurrent);

authRouter.post('/users/logout', authenticate, UserService.signout);

module.exports = authRouter;