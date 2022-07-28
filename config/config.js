const dotenv = require('dotenv');

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const SESSION_SECRET = process.env.SESSION_SECRET;

module.exports = { MONGO_URL, SESSION_SECRET };