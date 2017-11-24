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

  router.get('/orders/:id', function(req, res) {
    console.log(req.params);
    // knex  
    //   .select('*')
    //   .from('orders')
    //   .where('order_id', req.params.id)
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