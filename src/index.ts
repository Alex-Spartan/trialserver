import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { Stripe } from 'stripe';

const app = express();
const port = 3000;

dotenv.config();
app.use(express.json());
app.use(cors(
  {
    origin: 'http://localhost:5173'
  }
));

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' });
});

const stripe = new Stripe(process.env.Secret_key!, {

})

app.post('/payment/create-checkout-session', async (req, res) => {
  const {price, productName, quantity} = req.body;
    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: productName
          },
          unit_amount: price * 100
        },
        quantity: quantity
      }],
      mode: 'payment',
      ui_mode: 'embedded',
      billing_address_collection: 'required',
      return_url: 'http://localhost:5173/checkout/return?session_id={CHECKOUT_SESSION_ID}'
    });
    
    res.send({clientSecret: session.client_secret, sessionId: session.id});
  
});

app.get('/payment/return', async (req: Request, res: Response) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id as string);
  res.send(session);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});