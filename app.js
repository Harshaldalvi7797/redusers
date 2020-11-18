const express = require("express");
const bodyParser = require("body-parser");
const methodoverride = require("method-override");
const redis = require("redis");
const exphbs = require("express-handlebars");
const app = express();
const port = 3000;

//create redis client
let client = redis.createClient();

client.on("connect", function() {
  console.log("connected to redis");
});

// client.on("error", function(error) {
//   console.error(error);
// });
//view engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//method override
app.use(methodoverride("_method"));

app.get("/", (req, res, next) => {
  res.render("searchusers");
});

app.post("/user/search", (req, res, next) => {
  let id = req.body.id;
  client.hgetall(id, function(err, obj) {
    if (!obj) {
      res.render("searchusers", {
        error: "User does not exist"
      });
    } else {
      obj.id = id;
      res.render("details", {
        user: obj
      });
    }
  });
});

app.listen(port, err => {
  console.log(`connect on ${port}`);
});
