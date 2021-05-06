const express = require('express');
const router = express.Router();

const books = [];

/* if (process.env.NODE_ENV === "production") {
  app.use(express.static("views"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,  "views", "index.ejs"));
  });
} */

/* app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.static(__dirname + '/views'));

app.use(bodyParser.urlencoded({ extended: false })); */

router.get('/', (req, res, next) => {
  res.render('pages/prove03', { pageTitle: 'Add Book', pageDesc: 'Add a book to the list' });
});

router.get('/books', (req, res, next) => {
  res.render('pages/books', {
    pageTitle: 'Display Books',
    pageDesc: 'Displaying the books you added',
    books: books,
    hasBooks: books.length > 0
  });
});

router.post('/add-book', (req, res, next) => {
  books.push({ name: req.body.title, summary: req.body.summary, author: req.body.author });
  res.redirect('/prove03/books');
});

module.exports = router;
