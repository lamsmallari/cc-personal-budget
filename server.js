const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = app;

const PORT = process.env.PORT || 4001;

app.use(cors());

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

// Mount your existing apiRouter below at the '/api' path.
const apiRouter = require('./server/api');

app.use("/api", apiRouter);