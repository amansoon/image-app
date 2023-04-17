// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: object;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log("/login/callback called")

  if (!req.query.code) {
    return res.status(200).json({ data: { status: "code not get" } });
  }

  const client_id = process.env.NEXT_PUBLIC_API_KEY as string;
  const client_secret = process.env.NEXT_PUBLIC_API_SECRET as string;
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

  const oauth_url = `https://unsplash.com/oauth/token?${queryParams.toString()}`;

  try {
    const response = await fetch(oauth_url, {
      method: "POST",
    });
    if (response.status === 200) {
      const result = await response.json();
      res.status(200).json({ data: result });
    } 
    else {
      res.status(200).json({ data: { status: "unable to authorize" } });
    }
  } catch (error) {
    console.log(error);
    res.status(200).json({ data: { status: "unable to authorizize" } });
  }
}
