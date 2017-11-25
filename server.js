"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

const twilio      = require('twilio');
const client      = new twilio(process.env.SMS_Account, process.env.SMS_Token);

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/", usersRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Orders review page:
app.get('/orders/:id', (req, res) => {
  if (req.params.id) {
    console.log("Req params input: ", req.params.id)
  }
  knex('orders').select(1).where('id', req.params.id)
    .then((rows) => {
      if (!rows.length) {
        return res.sendStatus(404);
      } else {
        return knex.select('title', 'description', 'price', 'line_items.quantity', 'orders.total_price', 'orders.id')
                .from('items')
                .innerJoin('line_items', 'line_items.item_id', 'items.id')
                .innerJoin('orders', 'line_items.order_id', 'orders.id')
                .where('orders.id', req.params.id)
                .asCallback(function(err, result) {
                  if (err) { 
                    return err;
                  } else {
                    return result;
                  }
                }).then(function(result) {
          // console.log(result);
          return res.render('orders_review_page', {'result': result});
        })
      } 
    });
});

app.get('/o/:id', function redirectToOrders(req, res) {
  knex('orders').select('id').where('id', req.params.id)
  .then(function(result) {
    if(!result){
      res.redirect('/orders/'+req.params.id)
    } else{
      res.send(404);
    }
  });
});

app.get('/owner', function(req, res) {
  res.render('owner_secret');
});

app.get("/menu", (req, res) => {
  res.render("menu");
});

app.post('/menu', (req, res)=>{
  return new Promise(function(resolve, reject) {

    let itemName = req.body.item_name || '';
    let totalPrice = Number(req.body.total) || 0;
    let phoneNum = req.body.phone || '';
    let firstName = req.body.fname || '';
    let lastName = req.body.lname || '';

    let SMS = `${phoneNum}: ${firstName} ${lastName} sended an order: `;
    var itemString = '';

    let itemQuantity = {};
    for(let key of itemName){
      let lastSpceIndex = key.lastIndexOf(' ');
      let item = key.substring(0, lastSpceIndex);
      let quantity = Number(key.substring(lastSpceIndex));
      itemQuantity[item] = quantity || 0;
      itemString += item.concat(' ' + quantity.toString() + '; ');
    }

    client.messages.create({
      body: SMS + itemString,
      to: process.env.SMS_to,
      from: process.env.SMS_from
    })

    resolve({lastName, firstName, phoneNum, itemQuantity: itemQuantity, totalPrice});

  })
  .then(function(userObj) {
    //update users
    knex('users').select(1).where('phone', userObj.phoneNum)
    .then((rows)=>{
      if(rows.length){
        return knex('users')
          .where('phone', userObj.phoneNum)
          .update({
            'first_name': userObj.firstName,
            'last_name': userObj.lastName
          })
          .then(()=>{
            return knex('users').select('id').where('phone', userObj.phoneNum)
            .then(function(rows) {
              let userId = rows[0].id;
              userObj.userId = userId;
              return userObj;
            });
          });
      } else{
        return knex('users')
          .insert({
            'phone': userObj.phoneNum,
            'first_name': userObj.firstName,
            'last_name': userObj.lastName
          })
          .then(function() {
            return knex('users').select('id').where('phone', userObj.phoneNum)
            .then(function(rows) {
              let userId = rows[0].id;
              userObj.userId = userId;
              return userObj;
            });
          });
      }

      //insert orders
    })
    .then(function(orderObj) {
        return knex('orders').insert({
          'order_id': orderObj.userId,
          'total_price': orderObj.totalPrice
        })
        .then(function() {
          return knex('orders').select('id').where('order_id', orderObj.userId)
          .then(function(rows) {
            let orderId = rows[rows.length - 1].id;
            orderObj.orderId = orderId;
            return orderObj;
          });
        });

    })
    .then(function(itemObj) {
        for(let key in itemObj.itemQuantity){
          knex('items').select('id').where(('title'), 'like', `%${key}%`)
          .then(function(rows) {
            return knex('line_items').insert({
              'item_id': rows[0].id,
              'order_id': itemObj.orderId,
              'quantity': Number(itemObj.itemQuantity[key])
            });
          });
        }
        return itemObj.orderId;
    })
    //redirect url
    .then(function(id) {
      res.redirect(`/o/${id}`);
    });
  });

});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
