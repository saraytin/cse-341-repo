// Controller for W08
const https = require("https");

const ITEMS_PER_PAGE = 10;

const renderIndex = (req, res, json) => {
  let searchedValue = req.body.searchValue || req.query.searchValue || "";
  let page = req.query.page || 1;

  const indexStart = (page - 1) * ITEMS_PER_PAGE;
  const indexEnd = page * ITEMS_PER_PAGE;

  const filteredData = global.jsonResponse.filter((x) => x.name.toLowerCase().includes(searchedValue.toLowerCase()));

  let options = {
    data: filteredData.slice(indexStart, indexEnd),
    path: "prove/prove08",
    title: "Week 8 Prove Assignment",
    searchedValue: searchedValue,
    page: page,
    numPages: Math.ceil(filteredData.length / ITEMS_PER_PAGE),
  };

  res.render("pages/prove/prove08", options);
};

exports.processJson = (req, res, next) => {
  var url = "https://byui-cse.github.io/cse341-course/lesson03/items.json";

  https
    .get(url, function (response) {
      var body = "";

      response.on("data", function (chunk) {
        body += chunk;
      });

      response.on("end", function () {
        global.jsonResponse = JSON.parse(body);
        renderIndex(req, res, global.jsonResponse);
      });
    })
    .on("error", function (e) {
      console.log("Got an error: ", e);
    });
};

exports.getIndex = (req, res, next) => {
  renderIndex(req, res, global.jsonResponse);
};
