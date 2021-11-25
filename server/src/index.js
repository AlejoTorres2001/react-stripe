require("dotenv").config({path:"./server/src/.env"});
const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')
const port = 3001

const app = express()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.use(cors({origin:"http://localhost:3000"}))
app.use(express.json())

app.post('/api/checkout',async (req,res)=>{
    try {
        const payment = await stripe.paymentIntents.create({

            amount: req.body.amount,
            currency: 'usd',
            payment_method_types: ['card'],
            description: 'Test payment of gaming mouse',
            payment_method: req.body.id,
            confirm: true
    
        })
        console.log(payment)
        res.send({message:"Payment successful"})
    } catch (error) {
        res.json({message:error.message}).status(500)
        
    }
    



})
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`server on port ${port}!`))