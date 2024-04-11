const express = require("express");
const apiRouter = express.Router();
const {
  addEnvelope,
  updateEnvelope,
  getAllEnvelope,
  getEnvelopeById,
  deleteEnvelopebyId,
  transferBudget,
} = require("./db");

// custom middlewares
const validateInstance = (req, res, next) => {
  const newEnvelope = req.body;

  if (
    !newEnvelope.hasOwnProperty("category") ||
    !newEnvelope.hasOwnProperty("budget")
  ) {
    return res.status(400).send("Invalid envelope");
  }

  next();
};

const validateBudget = (req, res, next) => {
  const budget = req.body;

  if (!budget.hasOwnProperty("budget")) {
    return res.status(400).send("Invalid budget");
  }

  next();
};

const checkEnvelope = (req, res, next, id, paramName) => {
  const envelope = getEnvelopeById(id);

  if (envelope) {
    req[paramName] = envelope;
    next();
  } else {
    res.status(404).send("Envelope not found!");
  }
}

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

apiRouter.param("from", checkEnvelope);
apiRouter.param("to", checkEnvelope);

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

apiRouter.put("/:envelopeId", validateInstance, (req, res, next) => {
  const modifiedEnvelope = req.body;
  res.send(updateEnvelope(req.params.envelopeId, modifiedEnvelope));
});

apiRouter.delete("/:envelopeId", (req, res, next) => {
  res.status(204).send(deleteEnvelopebyId(req.envelope.id));
});

// Route handlers
apiRouter.post('/transfer/:from/:to', validateBudget, (req, res) => {
  res.send(transferBudget(req.from, req.to, req.body.budget));
});

module.exports = apiRouter;