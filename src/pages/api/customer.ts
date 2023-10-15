// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

interface Data {
  messaging?: string;
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
      const { email } = req.body;
      const customer = await stripe.customers.create({ email });
      return res.status(200).json({ messaging: "Success" });
    } catch (error) {
      const result = error as Error;
      return res.status(400).send({ messaging: result.message });
    }
  } else {
    res.status(400).send({ messaging: "Method not allowed" });
  }
}
