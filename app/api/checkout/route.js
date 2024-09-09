import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req) {
  const body = await req.json()
  if (body.lineItems.length === 0) {
    return new Response("Error", {
      status: 405,
    })
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET ?? "", {
      apiVersion: "2024-06-20",
    })
    const session = await stripe.checkout.sessions.create({
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
      line_items: body.lineItems,
      mode: "payment",
    })
    return NextResponse.json({ session })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: "An error occurred" }, { status: 500 })
  }
}
