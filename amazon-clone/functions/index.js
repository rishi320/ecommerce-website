const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51Kb6yJSIPdXdQt6q34baZ3GwHJyzOvSomcUq650MTlpfTtEtDa1LcIdit31lnYgg5g16tBs0bzDwNcQuExnXh1IV00PbKSNq8i")

//API


//app config
const app = express();

//Middlewares
app.use(cors({origin: true}))
app.use(express.json());


//API Routes
app.get('/', (request, response)=> response.status(200).send('hello world'))

app.post('/payments/create', async function(request, response){
    const total = request.query.total;

    console.log("Payment request received", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "inr",
    });

    response.status(201).send({
        clientSecret: paymentIntent.client_secret,

    })
})
//Listen command
exports.api = functions.https.onRequest(app)

