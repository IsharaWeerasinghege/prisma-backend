const cookieParser = require('cookie-parser');
const express = require('express');

require('dotenv').config();
const app = express();

// Regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookie parser middleware
app.use(cookieParser());

// Routes
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

app.use('/api', userRoutes);

app.use('/api/posts', postRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => console.log('Server is listening on port 3000'));
