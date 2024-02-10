
require('dotenv').config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
    const requestBody = JSON.parse(event.body);
    const { customerId, paymentMethodId } = requestBody;


    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 500,
            currency: 'usd',
            customer: customerId,
            payment_method: paymentMethodId,
            payment_method_types: ['us_bank_account'],
            off_session: true, 
            confirm: true, 
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

