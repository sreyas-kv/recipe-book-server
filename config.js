'use strict';

require('dotenv').config();
exports.DATABASE_URL = process.env.DATABASE_URL;
exports.DATABASE_TEST_URL = process.env.DATA_BASE_TEST_URL;
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';