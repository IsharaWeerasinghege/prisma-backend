const prisma = require('../prisma/index.js');
const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next) => {
    try {
        // get token from cookies
        const token = req.cookies.token;

        // check if token exists
        if (!token) {
            res.status(401).json({
                success: false,
                error: 'You are not logged in'
            });
        }

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // check if user exists
        const currentUser = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        });

        if (!currentUser) {
            res.status(401).json({
                success: false,
                error: 'User belonging to this token no longer exists'
            });
        }

        // set user to currentUser
        req.currentUser = currentUser;

        next();

    } catch (error) {
        res.status(401).json({
            success: false,
            error: error.message
        });
    }
}