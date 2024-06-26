const { isFloatNumber } = require("../utils/number-utils");

const envelopes = [
  {
    id: "1",
    category: "Groceries",
    budget: 20000,
  },
  {
    id: "2",
    category: "Bills",
    budget: 5000,
  },
  {
    id: "3",
    category: "Savings",
    budget: 30000,
  },
];

const isValidEnvelope = (instance) => {
  instance.category = instance.category || "";
  instance.budget = instance.budget || "";

  if (typeof instance.category !== "string") {
    throw new Error("Envelope's category must be strings");
  }

  if (isFloatNumber(instance.budget)) {
    instance.budget = Number(instance.budget);
  } else {
    throw new Error("Envelope's budget must be a number.");
  }

  return true;
};

const getAllEnvelope = () => envelopes;
const getEnvelopeById = (id) => envelopes.find((x) => x.id === id);

const addEnvelope = (instance) => {
  const id = Date.now();
  const newEnvelope = { id, ...instance };

  if (isValidEnvelope(newEnvelope)) {
    envelopes.push(newEnvelope);
    return envelopes[envelopes.length - 1];
  }
};

const updateEnvelope = (id, instance) => {
  const instanceIndex = envelopes.findIndex((element) => {
    return element.id === id;
  });

  if (instanceIndex > -1 && isValidEnvelope(instance)) {
    envelopes[instanceIndex] = { id, ...instance };
    return envelopes[instanceIndex];
  } else {
    return null;
  }
};

const transferBudget = (fromEnvelop, toEnvelope, budget) => {
  const fromEnvelopRef = getEnvelopeById(fromEnvelop.id);
  const toEnvelopeRef = getEnvelopeById(toEnvelope.id);

  if (
    fromEnvelopRef &&
    toEnvelopeRef &&
    isValidEnvelope(fromEnvelop) &&
    isValidEnvelope(toEnvelope)
  ) {
    fromEnvelopRef.budget = fromEnvelop.budget - Number(budget);
    toEnvelopeRef.budget = toEnvelope.budget + Number(budget);

    return [fromEnvelopRef, toEnvelopeRef];
  } 
  
  return null;
};

const deleteEnvelopebyId = (id) => {
  let index = envelopes.findIndex((element) => {
    return element.id === id;
  });

  if (index !== -1) {
    envelopes.splice(index, 1);
    return true;
  } else {
    return false;
  }
};

module.exports = {
  getAllEnvelope,
  getEnvelopeById,
  addEnvelope,
  updateEnvelope,
  deleteEnvelopebyId,
  transferBudget,
};
