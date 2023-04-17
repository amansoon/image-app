export function authorizeUser() {
  const client_id = process.env.NEXT_PUBLIC_API_KEY as string;
  const redirect_uri = "http://localhost:3000/api/login/callback";
  const scope = "public+read_user+read_photos+write_likes+write_followers+read_collections+write_collections";
  const response_type = "code";

  const queryParams = new URLSearchParams({
    client_id,
    redirect_uri,
    response_type,
  });

  const oauth_url = `https://unsplash.com/oauth/authorize?${queryParams.toString()}&scope=${scope}`;
  window.open(oauth_url, '_parent');
}
