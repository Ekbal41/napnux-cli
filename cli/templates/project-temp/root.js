const napnux = require("napnux");
module.exports = napnux()
  .get("/", (req, res) => {
    res.render("hello");
  })
  .get("/hello/:name", (req, res) => {
    res.end(`Hello ${req.params.name}!`);
  });
