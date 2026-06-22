const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) return res.status(401).json({ message: 'Not authorized' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// All Pro features are unlocked for every user — no usage limits enforced.
exports.checkSubscription = (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Not authorized' });
    return next();
};

// All Pro features are unlocked for every user — premium endpoints are open to all.
exports.requirePro = (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'Not authorized' });
    return next();
};

// All users are treated as Pro (doesn't block, just adds flag)
exports.flagSubscription = (req, res, next) => {
    req.isPro = true;
    next();
};
