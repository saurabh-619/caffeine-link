const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/keys');

const isAuthenticated = (req, res, next) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // check token
    if (!token) {
        return res.status(401).json({
            error: 'No token, Authorization Denied'
        })
    }

    // verify token wheather legal or not, with help of secret

    try {
        const decoded = jwt.verify(token, jwtSecret);       //applies algo stored in token and secret to build payload again and return it
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({
            error: err.message
        })
    }
}

module.exports = isAuthenticated;