const jwt = require('jsonwebtoken');
const User = require('../Models/User');


protect = async (req, res, next) => {
    try {
        let token;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in. Please log in first'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');

        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({
                status: 'fail',
                message: 'The user belonging to this token no longer exists'
            });
        }

        req.user = currentUser;
        
        next();
    } catch (error) {
        return res.status(401).json({
            status: 'fail',
            message: 'Invalid or expired token',
            error: error.message
        });
    }
};

module.exports = protect;
