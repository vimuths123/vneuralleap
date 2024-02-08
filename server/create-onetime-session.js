
require('dotenv').config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const success_url = "https://www.neuralleap.ai/thank-you.html";
const cancel_url = "https://www.neuralleap.ai/thank-you.html";

exports.handler = async (event, context) => {
    const requestBody = JSON.parse(event.body);
    const { priceid } = requestBody;

    try {
        const customer = await stripe.customers.create();

        const session = await stripe.checkout.sessions.create({
            customer: customer.id,
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceid,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${YOUR_DOMAIN}/success.html`,
            cancel_url: `${YOUR_DOMAIN}/cancel.html`,
        });

        return {
            statusCode: 303,
            headers: {
                Location: session.url,
            },
            body: '',
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

