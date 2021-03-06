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
const moment      = require('moment-timezone');

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
  res.render('index');
});

app.get('/orders', (req, res) => {

  res.status(404);
  res.render('error', {statNum: 404, message: 'Page not found'});
  return;
});

// Orders review page:
app.get('/orders/:id', (req, res) => {
  knex('orders').select(1).where('id', req.params.id).andWhere('total_price', '>', 0)
    .then((rows) => {
      if (!rows.length) {
        res.status(404);
        res.render('error', {statNum: 404, message: 'This order does not exist. Please try again.'});
        return;
      } else {
        return knex.select('title', 'description', 'price', 'line_items.quantity', 'orders.total_price', 'orders.id', 'orders.est_ready_time')

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
            return res.render('orders_review_page', {'result': result});
          });
      }
    });
});

app.get('/o/:id', function redirectToOrders(req, res) {
  knex('orders').select('id').where('id', req.params.id)
    .then(function(result) {
      if(result.length){
        res.redirect('/orders/' + req.params.id);
      } else{
        res.status(404);
        res.render('error', {statNum: 404, message: 'This order does not exist. Please try again.'});
        render;
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

    let SMS = `${phoneNum}: ${firstName} ${lastName} sent an order: `;
    var itemString = '';

    if(!itemName.length){
      res.status(400);
      res.render('error', {statNum: 400, message: 'Your order was empty. Please try again.'});
      render;
    }

    let itemQuantity = {};
    for(let key of itemName){
      let lastSpceIndex = key.lastIndexOf(' ');
      let item = key.substring(0, lastSpceIndex);
      let quantity = Number(key.substring(lastSpceIndex));
      itemQuantity[item] = quantity || 0;
      itemString += item.concat(' ' + quantity.toString() + '; ');
    }

    let preSMS = SMS + itemString;

    resolve({lastName, firstName, phoneNum, itemQuantity: itemQuantity, totalPrice, SMS: preSMS});

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

                  //get order id and send sms
                  client.messages.create({
                    body: orderObj.SMS + ' Order Id: ' + orderId,
                    to: process.env.SMS_to,
                    from: process.env.SMS_from
                  });

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

// owner editing page
app.post('/owner/accept', (req, res)=>{
  return new Promise(function(resolve, reject) {
    let orderId = req.body.orderId || null;
    let orderIdTime = req.body.orderIdTime || null;
    let currentTime = new Date().getTime();
    let placeAt = new Date(currentTime).toUTCString();
    let readyAt = new Date(currentTime + Number(orderIdTime) * 60 * 1000).toUTCString();

    resolve({orderId, placeAt, readyAt, orderIdTime});
  })
    .then(function(acceptObj) {
      return knex('orders').where('id', acceptObj.orderId)
        .update({
          'paid_at': acceptObj.placeAt,
          'ready_at': acceptObj.readyAt,
          'est_ready_time': acceptObj.orderIdTime
        })
        .then(function() {
          return knex('users').distinct('users.phone').select('users.phone')
            .innerJoin('orders', 'users.id', 'order_id')
            .where('orders.id', acceptObj.orderId)
            .then(function(rows) {
              let userPhone = rows[0].phone;
              let time = acceptObj.readyAt.toLocaleString();

              let SMS = `Your order has been accepted. It will be ready at ${moment(time).tz("America/Los_Angeles").format('HH:mm')}. Check the status at http://localhost:8080/o/${acceptObj.orderId}`;

              //send SMS to user
              client.messages.create({
                body: SMS,
                to: '+1' + userPhone,
                from: process.env.SMS_from
              });
            });
        });
    })
    .then(function() {
      return res.redirect('/owner');
    });
});

app.post('/owner/add', (req, res)=>{
  return new Promise((resolve, err) => {
    let type = req.body.addType.toUpperCase() || null;
    let title = req.body.addTitle || null;
    let des = req.body.addDes || null;
    let price = req.body.addPrice || null;
    let resId = req.body.addrestId || null;

    resolve({type, title, des, price, resId});
  })
    .then((insertObj) => {
      return knex('items').insert({
        'type': insertObj.type,
        'title': insertObj.title,
        'description': insertObj.des,
        'price': insertObj.price,
        'restaurant_id': insertObj.resId
      });
    })
    .then(function() {
      return res.redirect('/owner');
    });
});

app.post('/owner/delete', (req, res)=>{
  return new Promise((resolve, err) => {
    let deleId = req.body.itemId;
    resolve(deleId);
  })
    .then((deleId) => {
      return knex('items').where('id', deleId).del();
    })
    .then(() => {
      return res.redirect('/owner');
    });
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
