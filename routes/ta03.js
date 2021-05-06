//TA03 PLACEHOLDER
const {
    json
} = require('express');
const express = require('express');
const router = express.Router();
const https = require("https");
var dataJSON = [];
var originalDataJSON = [];
let url = "https://byui-cse.github.io/cse341-course/lesson03/items.json";
var searchValue='';
https.get(url, (response) => {
    let body = "";
    response.on("data", (chunk) => {
        body += chunk;
    });
    response.on("end", () => {
        try {
            originalDataJSON = JSON.parse(body);
            dataJSON=originalDataJSON;
        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});
var dataJSON = [];
router.get('/', (req, res, next) => {
    let url = "https://byui-cse.github.io/cse341-course/lesson03/items.json";
    res.render('pages/ta03', {
        title: 'Team Activity 03',
        path: '/ta03', // For pug, EJS 
        data: dataJSON,
        search:searchValue,
        activeTA03: true, // For HBS
        contentCSS: true, // For HBS
    });
});
router.post('/search', (req, res, next) => {
    searchValue = req.body.search;
    console.log(searchValue);
    dataJSON = originalDataJSON.filter(e => e.tags.includes(searchValue));
    console.log(dataJSON);
    res.redirect('/ta03');
});
module.exports = router;