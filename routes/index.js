const registerRoutes = require("./register");
const loginRoutes = require("./login");
const bookinfoRoutes = require("./bookinfo");
const  searchRoutes = require("./search");
//const reviewratingRoutes = require("./reviewrating");


const constructorMethod = app => {
  app.use("/register",registerRoutes);
  app.use("/login", loginRoutes);
  app.use("/bookinfo", bookinfoRoutes);
  app.use("/search", searchRoutes);


  app.get('/', function (req, res) {
    res.render("pages/register");
  })

  app.get('/profile', function (req, res) {
    res.render("pages/profile");
  })
  app.get('/bookinfo/:bookId', function (req, res) {
    console.log(req.params);
    if(req.cookies.AuthCookie)
    {
      res.render("pages/bookinfo",
        req.params
    );
    }
    else
    {
      res.redirect("/login");
    }
    })

  app.get("/logout", function(req, res) {
    res.clearCookie('AuthCookie');
    res.render("pages/logout");
  });


 app.use("*", (req, res) => {
  res.status(404).json({ error: "Not found" });
});
};

module.exports = constructorMethod;
