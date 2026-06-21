const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in. Please log in first'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'fail',
                message: 'You do not have permission to access this route'
            });
        }

        next();
    };
};

module.exports = authorize;
