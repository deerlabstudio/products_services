const express = require('express');
const cors = require('cors');

/** Express App */
const app = express();

/** Middlewares */
const errorHandler = require('./middlewares/error-handler');

/** controllers */
const HealthCheckController = require('./controllers/HealthCheck');
const CategoriesController = require('./controllers/Categories');
const ProductsController = require('./controllers/Products');

app.use(express.json());
app.use(cors());
app.use(new HealthCheckController(express.Router()).router);
app.use(new CategoriesController(express.Router()).router);
app.use(new ProductsController(express.Router()).router);
app.use(errorHandler());

module.exports = app;
