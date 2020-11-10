exports.getPosts = (req, res, next) => {
    res.json({ posts: [{ title: 'Test post', content: 'la la la la', author: 'Chekay' }] });
};

exports.createPost = (req, res, next) => {
    // Create post in db
    const { title } = req.body;
    const { content } = req.body;
    res.status(201).json({
        message: 'Post created successfully!',
        post: { id: new Date().toISOString(), title, content }
    });
};
