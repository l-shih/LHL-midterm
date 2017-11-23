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

  router.get('/orders', (req, res) => {
    knex
      .select("*")
      .from("orders")
      .then((results) => {
      res.render('orders_review_page', {
        results: results
      });
    })
  });

  return router;
};