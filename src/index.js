const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
const { data } = require("./data");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
// your code goes here
app.get("/topRankings", async (req, res) => {
  const offset = sanitize(req.query.offset, 0);
  const limit = sanitize(req.query.limit, 20) + offset;
  console.log("skip", offset, "limit", limit);
  const newData = await data.slice(offset, limit);
  res.send(newData);
});

const sanitize = (value, defVal) => {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return defVal;
  } else {
    return Number(value);
  }
};

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
