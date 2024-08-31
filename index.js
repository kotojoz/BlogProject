import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

let allPosts = [new Post(1, "First", "I`m tripping"), new Post(2, "Second", "I`m tired")];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index.ejs', {posts: allPosts});
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
})

function Post(id, title, content) {
    this.id = id;
    this.title = title;
    this.content = content;
}