const passport = require("passport");
const Item = require("mongoose").model("Item");
const { OK } = require("http-status");

module.exports = (parent, router) => {
  parent.use("/items", router);

  const isAuth = passport.authenticate("jwt", { session: false, failWithError: true });
  router.get("/", isAuth, listItems);
  router.get("/:id", isAuth, showItem);
};

function listItems(req, res, next) {
  Item.find()
    .then(items => {
      res.status(OK).json(items);
    })
    .catch(err => next(err));
}

function showItem(req, res, next) {
  Item.findById(req.params.id)
    .then(item => {
      res.status(OK).json(item);
    })
    .catch(err => next(err));
}
