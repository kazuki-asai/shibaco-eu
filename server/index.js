import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Stripe from 'stripe'

const app = express()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

app.use(cors())
app.use(express.json())

// POST /api/checkouts
// body: { items: [{ name, price, quantity, image }], shipping_fee?: number }
app.post('/api/checkouts', async (req, res) => {
  try {
    const { items, shipping_fee: shippingFeeRaw } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' })
    }

    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'jpy',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    }))

    const shippingFee = Number(shippingFeeRaw)
    if (Number.isFinite(shippingFee) && shippingFee > 0) {
      lineItems.push({
        price_data: {
          currency: 'jpy',
          product_data: {
            name: 'Shipping',
          },
          unit_amount: Math.round(shippingFee),
        },
        quantity: 1,
      })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/checkout/success`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/cart`,
    })

    res.json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// GET /api/checkouts/:session_id — verify payment before clearing the cart
app.get('/api/checkouts/:session_id', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.session_id)
    if (session.payment_status !== 'paid') {
      return res.status(402).json({
        error: 'Payment not completed',
        status: session.payment_status,
        paid: false,
      })
    }
    res.json({ paid: true, status: session.status, payment_status: session.payment_status })
  } catch (err) {
    console.error('Stripe session retrieve error:', err.message)
    res.status(404).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
