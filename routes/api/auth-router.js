const express = require('express');
const UserService = require('../../controllers/auth-controller');
const isEmptyBody = require("../../middlewares/isEmptyBody");
const validateBody = require("../../decorators/validateBody");
const { userSignupSchema, userSigninSchema } = require('../../models/User');
const authenticate = require('../../middlewares/authenticate')
// const upload = require('../../middlewares/upload');

const authRouter = express.Router();

const userSignupSchemaValidate = validateBody(userSignupSchema);
const userSigninSchemaValidate = validateBody(userSigninSchema);

authRouter.post('/register', isEmptyBody, userSignupSchemaValidate, UserService.signup);

authRouter.post('/login', isEmptyBody, userSigninSchemaValidate, UserService.signin);

authRouter.get('/current', authenticate, UserService.getCurrent);

authRouter.post('/logout', authenticate, UserService.signout);

module.exports = authRouter;