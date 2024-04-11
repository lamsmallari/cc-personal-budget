const envelopes = [
  {
    id: 1,
    category: "Groceries",
    budget: 20000,
  },
  {
    id: 2,
    category: "Bills",
    budget: 5000,
  },
  {
    id: 3,
    category: "Savings",
    budget: 30000,
  },
]

const isValidEnvelope = (instance) => {
  instance.category = instance.category || '';
  instance.budget = instance.budget || '';

  if (typeof instance.category !== 'string') {
    throw new Error('Envelope\'s category must be strings');
  }

  if (!isNaN(parseFloat(instance.budget)) && isFinite(instance.budget)) {
    instance.budget = Number(instance.budget);
  } else {
    throw new Error('Envelope\'s budget must be a number.');
  }

  return true;
}


const getAllEnvelope = () => envelopes;
const getEnvelope = (id) => envelopes.find(x => x.id === id);

const addEnvelope = (instance) => {
  const id = Date.now();
  const newEnvelope = { id, ...instance}

  if(isValidEnvelope(newEnvelope)) {
    envelopes.push(newEnvelope);
    return envelopes[envelopes.length - 1];
  }
}

module.exports = { 
  getAllEnvelope,
  getEnvelope,
  addEnvelope
}