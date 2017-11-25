"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get('/food_type',function(req, res) {
    knex
      .select('type')
      .from('items')
      .groupBy('type')
      .then(function(results) {
        res.json(results);
      });
  });

  router.get('/items',function(req, res) {
    knex
      .select()
      .from('items')
      .then(function(results) {
        res.json(results);
      });
  });

  router.get('/orders', function(req, res) {
    knex
      .select('*')
      .from('orders')
      .then(function(results) {
        res.json(results);
      });
  });

  return router;
};