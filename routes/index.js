const registerRoutes = require("./register");
const loginRoutes = require("./login");
const bookinfoRoutes = require("./bookinfo");
const  searchRoutes = require("./search");
//const reviewratingRoutes = require("./reviewrating");


const constructorMethod = app => {
  app.use("/register",registerRoutes);
  app.use("/login", loginRoutes);
  // app.use("/bookinfo", bookinfoRoutes);
  app.use("/search", searchRoutes);
  //app.use("/reviewrating", reviewratingRoutes);
  
 app.use("*", (req, res) => {
  res.status(404).json({ error: "Not found" });
});
};

module.exports = constructorMethod;
