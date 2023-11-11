const prisma = require('../prisma/index.js');
const cookieToken = require('../utils/cookieToken.js');

// user signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // validate user inputs
        if (!name || !email || !password) {
            res.status(400).json({
                success: false,
                error: 'Please provide all required fields'
            });
        }

        // check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (existingUser) {
            res.status(400).json({
                success: false,
                error: 'User already exists'
            });
        }

        // create new user
        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password
            }
        });

        // send token
        cookieToken(newUser, res);

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}