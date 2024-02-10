
require('dotenv').config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
    const requestBody = JSON.parse(event.body);
    const { paymentMethodId } = requestBody;


    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount, // Charge amount in smallest currency unit, e.g., cents for USD
            currency: 'usd',
            customer: customerId,
            payment_method: paymentMethodId,
            off_session: true, // Indicates that the customer is not actively participating in the checkout process
            confirm: true, // Automatically confirm the payment intent
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `PaymentIntent created: ${paymentIntent.id}`,
            }),
        };

    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: e.message,
            }),
        };
    }
};

