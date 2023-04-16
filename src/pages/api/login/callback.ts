// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: object;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (!req.query.code) {
    return res.status(200).json({ data: { status: "code not get" } });
  }

  const client_id = process.env.API_KEY as string;
  const client_secret = process.env.API_SECRET as string;
  const redirect_uri = "http://localhost:3000/api/login/callback";
  const code = req.query.code as string;
  const grant_type = "authorization_code";
  
  const queryParams = new URLSearchParams({
    client_id,
    client_secret,
    redirect_uri,
    code,
    grant_type,
  });

  const oautURL = `https://unsplash.com/oauth/token?${queryParams.toString()}`;

  fetch(oautURL, {
    method: "POST",
  }).then((response) => {
    console.log(response)
    return res.status(200).json({ data: response });
  });

  res.status(200).json({ data: {"status": "something went wrong"} });
}
