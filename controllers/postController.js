const prisma = require('../prisma/index.js');

// create post
exports.createPost = async (req, res) => {
    try {
        const { slug, title, body, authorId } = req.body;

        // validate user inputs
        if (!slug || !title || !body || !authorId) {
            res.status(400).json({
                success: false,
                error: 'Please provide all required fields'
            });
        }

        // create new post
        const newPost = await prisma.post.create({
            data: {
                slug: slug,
                title: title,
                body: body,
                author: { connect: {id: authorId} }
            }
        });

        res.status(201).json({
            success: true,
            data: newPost
        });

    } catch (error) {
        console.log(error)
    }
}

// get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts =await prisma.post.findMany({
            include: {}
        });

        res.status(200).json({
            success: true,
            data: posts
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message
        });
    }
}

// get single post
exports.getPost = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await prisma.post.findUnique({
            where: {
                id: parseInt(id)
            }
        });

        res.status(200).json({
            success: true,
            data: post
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message
        });
    }
}


// search posts
exports.searchPosts = async (req, res) => {
    try {
        const { title } = req.query;

        const posts = await prisma.post.findMany({
            where: {
                title: {
                    contains: title
                }
            }
        });

        res.status(200).json({
            success: true,
            data: posts
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message
        });
    }
}