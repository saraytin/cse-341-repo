const teamRoutes = require("express").Router();

teamRoutes
  .use("/ta01", require("./ta01"))
  .use("/ta02", require("./ta02"))
  .use("/ta03", require("./ta03"))
  .use("/ta04", require("./ta04"))
  .get("/", (req, res, net) => {
    res.render("pages/teamActivities/", {
      pageTitle: "Team Activities",
      path: "/teamActivities",
    });
  });

module.exports = teamRoutes;
