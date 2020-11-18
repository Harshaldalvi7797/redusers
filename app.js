const express = require("express");
const bodyParser = require("body-parser");
const methodoverride = require("method-override");
const redis = require("redis");
const app = express();
const port = 3000;

app.listen(port, err => {
  console.log(`connect on ${port}`);
});
