// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

interface Data {
  messaging?: string;
  subscription?: Stripe.Response<Stripe.ApiList<Stripe.Subscription>>;
}

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-08-16",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method == "GET") {
    const { slug } = req.query;
    const customers = await stripe.customers.list({ limit: 100 });

    const customer = customers.data.find((c) => c.metadata.user_id == slug);
    const subscription = await stripe.subscriptions.list({
      limit: 1,
      customer: customer?.id,
      expand: ["data.default_payment_method", "data.customer"],
    });
    return res.status(200).json({ subscription });
  }
}
