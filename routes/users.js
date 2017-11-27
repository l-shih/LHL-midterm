"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get('/food_type', function(req, res) {
    knex
      .distinct('type')
      .select('type')
      .from('items')
      .then(function(results) {
        res.json(results);
      });
  });

  router.get('/items', function(req, res) {
    knex
      .select()
      .from('items')
      .then(function(results) {
        res.json(results);
      });
  });

  return router;
};