import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;
let allPosts = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index.ejs', {posts: allPosts});
});

app.get('/create_post', (req, res) => {
    res.render('create_post.ejs');
});

app.post('/create_post', (req, res) => {
    const newId = getNewId();
    const newPost = new Post(newId, req.body.title, req.body.content);
    allPosts.push(newPost);
    res.redirect('/');
});

app.get('/update/:id', (req, res) => {
    const post = findPostById(req.params.id);
    res.render('update_post.ejs', {post: post});
});

app.post('/update', (req, res) => {
    const post = findPostById(req.body.id);
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    const postId = Number(req.params.id);
    allPosts = allPosts.filter(post => post.id !== postId);
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});

function Post(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
}

const getNewId = () => {
    return allPosts.length === 0 ? 1 : allPosts[allPosts.length - 1].id + 1;
};

const findPostById = (id) => {
    const numericId = Number(id);
    return allPosts.find(post => numericId === post.id);
};