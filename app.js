const express = require("express");
const bodyParser = require("body-parser");
const methodoverride = require("method-override");
const redis = require("redis");
const exphbs = require("express-handlebars");
const app = express();
const port = 3000;

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

app.listen(port, err => {
  console.log(`connect on ${port}`);
});
