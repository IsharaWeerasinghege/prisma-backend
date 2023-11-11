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

// user login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;


        // validate user inputs
        if (!email || !password) {
            res.status(400).json({
                success: false,
                error: 'Please provide all required fields'
            });
        }

        // check if user exists
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if (!user) {
            res.status(400).json({
                success: false,
                error: 'User does not exist'
            });
        }

        // check if password is correct
        // const isMatch = await bcrypt.compare(password, user.password);

        if (password !== user.password) {
            res.status(400).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        // send token
        cookieToken(user, res);

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}

// user logout
exports.logout = async (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0)
        }).send();
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
}