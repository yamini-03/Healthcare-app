import express from "express";

const app = express();
const port = 3000; //add your port here
const PUBLISHABLE_KEY = "pk_test_51KrlrDSIcP8INkkWiRtbOnh3z3S3YcLwLeF2Qf8NRJ6MLyqgX5OgOunacQLhoWGRucQgLFUpT5AuLU2owX9yzGsF00v6m3BPOm";
const SECRET_KEY = "sk_test_51KrlrDSIcP8INkkWZitd7rp2we7CbAbZna1bD95cMDdzIz6bEc0nKfzz8deWcRvxdwbZmXm3Bq76wm2rmnScD1lP00KpcpIef1";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

app.listen(port, () => {
  console.log(`Example app listening at http://192.168.2.106:${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1099, //lowest denomination of particular currency
      currency: "INR",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});
