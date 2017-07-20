const passport = require("passport");
const mongoose = require("mongoose");
const Item = mongoose.model("Item");
const { ObjectId } = mongoose.Types;
const { ValidationError } = mongoose.Error;
const {
  OK,
  CREATED,
  ACCEPTED,
  NO_CONTENT,
  NOT_ACCEPTABLE,
  UNPROCESSABLE_ENTITY,
  UNAUTHORIZED
} = require("http-status");

module.exports = (parent, router) => {
  parent.use("/items", router);

  const isAuth = passport.authenticate("jwt", { session: false, failWithError: true });

  router.use(isAuth);
  router.get("/", listItems);
  router.get("/:id", checkObjectId, showItem);
  router.post("/", isAdmin, createItem);
  router.put("/:id", isAdmin, checkObjectId, updateItem);
  router.delete("/:id", isAdmin, checkObjectId, deleteItem);
  router.use(errorHandler);
};

function listItems(req, res, next) {
  Item.find()
    .then(items => res.status(OK).json(items))
    .catch(err => next(err));
}

function showItem(req, res, next) {
  Item.findById(req.params.id)
    .then(item => res.status(OK).json(item))
    .catch(err => next(err));
}

function createItem(req, res, next) {
  Item.createInstance(req.body)
    .then(item => res.status(CREATED).json(item))
    .catch(err => next(err));
}

function updateItem(req, res, next) {
  Item.updateInstance(req.params.id, req.body)
    .then(item => res.status(ACCEPTED).json(item))
    .catch(err => next(err));
}

function deleteItem(req, res, next) {
  Item.findByIdAndRemove(req.params.id)
    .then(item => res.status(NO_CONTENT).json())
    .catch(err => next(err));
}

function isValidationError(err) {
  return err instanceof ValidationError;
}

function checkObjectId(req, res, next) {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(UNPROCESSABLE_ENTITY).json({ message: "Invalid object id provided" });
    return;
  }

  next();
}

function errorHandler(err, req, res, next) {
  if (!isValidationError(err)) {
    next(err);
    return;
  }

  res.status(NOT_ACCEPTABLE).json({ message: err.message });
}

function isAdmin(req, res, next) {
  if (req.user && req.user.isAdmin)
    return next();
  res.sendStatus(UNAUTHORIZED);
}
