// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

interface Data {
  messaging?: string;
  products?: Stripe.Response<Stripe.ApiList<Stripe.Product>>;
}

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-08-16",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  if (method == "GET") {
    const products = await stripe.products.list({
      expand: ["data.default_price"],
    });
    

    return res.status(200).json({ products });
  } else if (method == "POST") {
  } else {
    res.status(400).send({ messaging: "Method not allowed" });
  }
}
