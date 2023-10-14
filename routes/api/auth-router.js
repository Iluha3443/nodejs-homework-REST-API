const express = require('express');
const UserService = require('../../controllers/auth-controller');
const isEmptyBody = require("../../middlewares/isEmptyBody");
const validateBody = require("../../decorators/validateBody");
const {schemas} = require('../../models/User')

const authRouter = express.Router();

module.exports = authRouter;