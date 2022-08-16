const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
// const { async } = require("@firebase/util");
// eslint-disable-next-line max-len
const stripe = require("stripe")("sk_test_51LWJnxSDgSbVt4hkWjZlQ6rmBAo8w0AnOuvQ2j43lNtZs9EqSB1HWG43FckvNklBrleFUfj0MyK4mbHhnqJyew6l00jxEPFByD");

// App config

const app = express();

// Middle wares

app.use(cors({origin: true}));
app.use(express.json());

// API routes

app.get("/", function(req, res) {
  res.status(200).send("Hello World !");
});

app.post("/payments/create", function(req, res) {
  const total = req.query.total;

  console.log("payment total amount>>>>", total);

  const paymentIntent = stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen Command

exports.api = functions.https.onRequest(app);

// http://localhost:5001/clone-adac4/us-central1/api
