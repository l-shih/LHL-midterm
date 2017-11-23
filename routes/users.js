"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
      });
  });

  router.get('/orders', function(req, res) {
    knex
      .select("*")
      .from("orders")
      .then((results) => {
<<<<<<< HEAD
        res.render('orders_review_page', {
          results: results
        });
=======
        res.json(results);
>>>>>>> c0fd93c61aba719f6f114371e4be76a2397da4e4
      });
  });

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

  return router;
};