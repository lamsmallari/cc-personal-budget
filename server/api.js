const express = require('express');
const apiRouter = express.Router();
const { addEnvelope, getAllEnvelope, getEnvelopeById } = require('./db');

// custom middlewares
const validateInstance = (req, res, next) => {
  const newEnvelope = req.body;

  if (
    !newEnvelope.hasOwnProperty('category') ||
    !newEnvelope.hasOwnProperty('budget')
  ) {
    return res.status(400).send("Invalid envelope");
  }

  next();
};

// params
apiRouter.param("envelopeId", (req, res, next, id) => {
  const envelope = getEnvelopeById(id);

  if (envelope) {
    req.envelope = envelope;
    next();
  } else {
    res.status(404).send("Envelope not found!");
  }
});

// routes
apiRouter.get('/', (req, res, next) => {
  res.send(getAllEnvelope());
});

apiRouter.get('/:envelopeId', (req, res, next) => {
  res.send(req.envelope);
});

apiRouter.post("/", validateInstance, (req, res, next) => {
  const newEnvelope = req.body;
  res.status(201).send(addEnvelope(newEnvelope));
});

module.exports = apiRouter;