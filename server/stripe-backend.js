const express = require("express");
const cors = require('cors');

require('dotenv').config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const amount = process.env.AMOUNT

exports.handler = async (event, context) => {
    const requestBody = JSON.parse(event.body);
    const qty = requestBody.qty;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * qty,
        currency: process.env.CURRENCY,
        payment_method_types: ['us_bank_account']
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
          clientSecret: paymentIntent.client_secret,
      }),
    };
};  
