const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const errorHandler = require('express-error-handler');
const cors = require('cors');

const PORT = process.env.PORT || 4001;

app.use(cors());

app.use(bodyParser.json());

app.use(errorHandler());

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

const apiRouter = require('./server/api');

app.use("/api", apiRouter);

module.exports = app;