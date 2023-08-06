const napnux = require("napnus");

module.exports = napnux()
  .static(__dirname + "/public")
  .ejs({
    views: __dirname + "/views",
  })
  .get("/", (req, res) => {
    res.render("hello");
  });
