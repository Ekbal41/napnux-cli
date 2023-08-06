const root = require("./root.js");

root
  .static(__dirname + "/public")
  .ejs({
    views: __dirname + "/views",
  })
  .start(3000, () => {
    console.log("> Server Listening on http://localhost:3000");
  });
