const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/test', (req, res, next) => {
  res.send("Hello world!");
});

module.exports = apiRouter;