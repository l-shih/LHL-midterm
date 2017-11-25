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
        res.json(results);
      });
  });

  router.get('/food_type',function(req, res) {
    knex
      .distinct('type')
      .select('type')
      .from('items')
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