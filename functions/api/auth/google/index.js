export const onRequestGet = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const redirect = url.searchParams.get("redirect");

  console.log("Debug Google Auth Env Vars:");
  console.log("GOOGLE_CLIENT_ID exists:", !!env.GOOGLE_CLIENT_ID);
  console.log("GOOGLE_REDIRECT_URI exists:", !!env.GOOGLE_REDIRECT_URI);
  console.log("Env keys:", Object.keys(env));

  const clientId = env.GOOGLE_CLIENT_ID;
  const redirectUri = env.GOOGLE_REDIRECT_URI;

  console.log("DEBUG: Env Keys:", Object.keys(env));
  console.log("DEBUG: ClientID:", clientId ? "Set" : "Missing");
  console.log("DEBUG: RedirectURI:", redirectUri ? "Set" : "Missing");

  if (!clientId || !redirectUri) {
    return new Response(JSON.stringify({ 
      error: 'Google OAuth not configured',
      details: {
        clientId: clientId ? 'Set' : 'Missing',
        redirectUri: redirectUri ? 'Set' : 'Missing',
        envKeys: Object.keys(env)
      }
    }), { status: 500 });
  }

  const scope = encodeURIComponent('openid email profile');
  const state = redirect ? encodeURIComponent(redirect) : '';

  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}&access_type=offline&prompt=consent${state ? `&state=${state}` : ''}`;

  return Response.redirect(authUrl, 302);
};
