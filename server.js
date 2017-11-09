const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const {BlogPosts} = require('./model');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

BlogPosts.create("First Blog", "Hello World", "Nawar Yossef", "11/2017")
BlogPosts.create("Second Blog", "This is my second post", "Nawar Yossef", "12/2017")
BlogPosts.create("Third Blog", "Happy New Year", "Nawar Yossef", "01/2018")


// GET request
app.get("/blog-posts", (req, res) => {
    res.json(BlogPosts.get())
})

// POST request
app.post("/blog-posts", jsonParser, (req, res) => {
    const allFields = [title, content, author, publishDate]
    for (let i = 0; i < allFields.length; i++) {
        if (!(allFields[i] in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    const newBlog = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate)
    res.status(201).json(item)
})


app.listen(process.env.PORT || 8080, () => {
    console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
  });