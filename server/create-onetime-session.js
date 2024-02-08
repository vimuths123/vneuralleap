
require('dotenv').config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const success_url = "https://www.neuralleap.ai/thank-you.html";
const cancel_url = "https://www.neuralleap.ai/thank-you.html";

exports.handler = async (event, context) => {
    // const requestBody = JSON.parse(event.body);
    // const { priceid } = requestBody;

    try {
        const customer = await stripe.customers.create();

        const session = await stripe.checkout.sessions.create({
            customer: customer.id,
            payment_method_types: ['us_bank_account'],
            line_items: [
                {
                    price: 'price_1OgrLQJYVRzxBOJIxJtsywA0',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: "https://www.neuralleap.ai/thank-you.html",
            cancel_url: "https://www.neuralleap.ai/thank-you.html",
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

