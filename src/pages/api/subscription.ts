// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

interface Data {
  messaging?: string;
  subscription?: Stripe.Response<Stripe.Checkout.Session>;
}

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-08-16",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  if (method == "POST") {
    try {
      const { email, priceId } = req.body;

      const customers = await stripe.customers.list({ limit: 100 });
      const public_domain = process.env.NEXT_PUBLIC_DOMAIN as string;
      const customer = customers.data.find((c) => c.email == email);
      const subscription = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        customer: customer?.id,
        success_url: `${public_domain}/success`,
        cancel_url: `${public_domain}/cancel`,
      });
      return res.status(200).json({ subscription });
    } catch (error) {
      const result = error as Error;
      return res.status(400).send({ messaging: result.message });
    }
  } else {
    res.status(400).send({ messaging: "Method not allowed" });
  }
}
