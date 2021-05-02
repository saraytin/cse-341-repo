var PORT = process.env.PORT || 3000;
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const books = [];

if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,  "build", "index.ejs"));
  });
}

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(__dirname + '/views'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
  res.render('index', { pageTitle: 'Add Book', pageDesc: 'Add a book to the list' });
});

app.get('/books', (req, res, next) => {
  res.render('books', {
    pageTitle: 'Display Books',
    pageDesc: 'Displaying the books you added',
    books: books,
    hasBooks: books.length > 0
  });
});

app.post('/add-book', (req, res, next) => {
  books.push({ name: req.body.title, summary: req.body.summary, author: req.body.author });
  res.redirect('/books');
});

app.listen(PORT);
