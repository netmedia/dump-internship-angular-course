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
  UNPROCESSABLE_ENTITY
} = require("http-status");

const isValidationError = err => err instanceof ValidationError;

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

module.exports = (parent, router) => {
  parent.use("/items", router);

  const isAuth = passport.authenticate("jwt", { session: false, failWithError: true });

  router.use(isAuth);
  router.get("/", listItems);
  router.get("/:id", checkObjectId, showItem);
  router.post("/", createItem);
  router.put("/:id", checkObjectId, updateItem);
  router.delete("/:id", checkObjectId, deleteItem);
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
  Item.create(req.body)
    .then(item => res.status(CREATED).json(item))
    .catch(err => next(err));
}

function updateItem(req, res, next) {
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(item => res.status(ACCEPTED).json(item))
    .catch(err => next(err));
}

function deleteItem(req, res, next) {
  Item.findByIdAndRemove(req.params.id)
    .then(item => res.status(NO_CONTENT).json())
    .catch(err => next(err));
}
