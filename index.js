/*******************************************************************************
 * Feel free to remove this comment block and all other comments after pulling.
 * They're for information purposes only.
 *
 * This layout is provided to you for an easy and quick setup to either pull
 * or use to correct yours after working at least 1 hour on Team Activity 02.
 * Throughout the course, we'll be using Express.js for our view engines.
 * However, feel free to use pug or handlebars ('with extension hbs'). You will
 * need to make sure you install them beforehand according to the reading from
 * Udemy course.
 * IMPORTANT: Make sure to run "npm install" in your root before "npm start"
 *******************************************************************************/
// Our initial setup (package requires, port number setup)
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
/* const routes = require('./routes'); */
const PORT = process.env.PORT || 5000; // So we can run on heroku || (OR) localhost:5000

const app = express();

const liveChat = require("./routes/prove/liveChat");

// Route setup. You can implement more in the future!
const ta01Routes = require("./routes/teamActivities/ta01");
const ta02Routes = require("./routes/teamActivities/ta02");
const ta03Routes = require("./routes/teamActivities/ta03a");
const ta04Routes = require("./routes/teamActivities/ta04");
const prove02Routes = require("./routes/prove/prove02");
const prove08Routes = require("./routes/prove/prove08");
const prove09Routes = require("./routes/prove/prove09");
const prove10Routes = require("./routes/prove/prove10");
const prove11Routes = require("./routes/prove/prove11");

const server = app
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  // For view engine as Pug
  //.set('view engine', 'pug') // For view engine as PUG.
  // For view engine as hbs (Handlebars)
  //.engine('hbs', expressHbs({layoutsDir: 'views/layouts/', defaultLayout: 'main-layout', extname: 'hbs'})) // For handlebars
  //.set('view engine', 'hbs')
  .use(bodyParser({ extended: false })) // For parsing the body of a POST
  .use("/teamActivities/ta01", ta01Routes)
  .use("/teamActivities/ta02", ta02Routes)
  .use("/teamActivities/ta03", ta03Routes)
  .use("/teamActivities/ta04", ta04Routes)
  .use("/prove/prove02", prove02Routes)
  .use("/prove/prove08", prove08Routes)
  .use("/prove/prove09", prove09Routes)
  .use("/prove/prove10", prove10Routes)
  .use("/prove/prove11", prove11Routes)
  .use(
    session({
      // Simple and not very secure session
      secret: "random_text",
      cookie: {
        httpOnly: false, // Permit access to client session
      },
    })
  )
  .use("/prove/prove12", liveChat)
  .get(
    "/",
    /* routes */ (req, res, next) => {
      // This is the primary index, always handled last.
      res.render("./pages/index", { title: "Welcome to my CSE341 repo", path: "/" });
    }
  )
  .use((req, res, next) => {
    // 404 page
    res.render("pages/404", { title: "404 - Page Not Found", path: req.url });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  console.log("Client connected");

  socket
    .on("new-name", () => {
      // Someone added a name! Tell everyone else to update the list.
      socket.broadcast.emit("update-list");
    })
    .on("disconnect", () => {
      console.log("A client disconnected!");
    })
    .on("newUser", (username, time) => {
      // A new user logs in.
      const message = `${username} has logged on.`;
      // Tell other users someone has logged on.
      socket.broadcast.emit("newMessage", {
        message,
        time,
        from: "admin",
      });
    })
    .on("message", (data) => {
      // Receive a new message
      console.log("Message received");
      console.log(data);
      // This one is simple. Just broadcast the data we received.
      // We can use { ...data } to copy the data object.
      socket.broadcast.emit("newMessage", {
        ...data,
      }); // Note, only emits to all OTHER clients, not sender.
    });
});
