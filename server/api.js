const express = require('express');
const apiRouter = express.Router();
const { addEnvelope, getAllEnvelope } = require('./db');

// custom middlewares
const validateInstance = (req, res, next) => {
  const newEnvelop = req.body;

  if (
    !newEnvelop.hasOwnProperty('category') ||
    !newEnvelop.hasOwnProperty('budget')
  ) {
    return res.status(400).send("Invalid envelope");
  }

  next();
};

// routes
apiRouter.get('/', (req, res, next) => {
  res.send(getAllEnvelope());
});

apiRouter.post("/", validateInstance, (req, res, next) => {
  const newEnvelope = req.body;
  res.status(201).send(addEnvelope(newEnvelope));
});

module.exports = apiRouter;