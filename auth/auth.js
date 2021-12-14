const jwt = require('express-jwt');
require('dotenv').config();

const jwtt = require('jsonwebtoken');

module.exports = {authorize,authorizeRequest};

function authorize(roles = []) {
    const secret=process.env.ACCESS_TOKEN_SECRET;
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
        jwt({ secret, algorithms: ['HS256'] }),

        // authorize based on user role
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            next();
        }
    ];
}

function authorizeRequest(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.sendStatus(401);
        jwtt.verify(token,process.env.ACCESS_TOKEN_SECRET,async (err,payload)=>{
            res.send(payload.role);
            });
    } catch (err) {
        next(err);
        console.error(err);
    }
}
