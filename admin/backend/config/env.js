require('dotenv').config();

module.exports = {
    port: process.env.PORT || 4000,
    mongoURI: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET
};
