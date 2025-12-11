import generateToken from '../../../utils/generateToken';
import crypto from 'crypto';
import { connectDB } from '../../../utils/db';
import User from '../../../models/User';
import { sendEmail } from '../../../utils/email';

export const onRequestGet = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state"); 

  const clientId = env.GOOGLE_CLIENT_ID;
  const clientSecret = env.GOOGLE_CLIENT_SECRET;
  const redirectUri = env.GOOGLE_REDIRECT_URI;

  if (!code) return new Response("Missing code", { status: 400 });

  try {
    // 1. Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    });

    const tokens = await tokenResponse.json();
    if (tokens.error) throw new Error(tokens.error_description || tokens.error);

    // 2. Get User Info
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` }
    });

    const userInfo = await userResponse.json();
    const normalizedEmail = String(userInfo.email || '').toLowerCase().trim();

    if (!normalizedEmail) {
        return new Response(JSON.stringify({ error: 'Unable to retrieve Google user email' }), { status: 400 });
    }
    
    // 3. Connect to Database
    if (env.MONGO_URI) {
      console.log('Connecting to MongoDB...');
      // Wrap connection in a timeout race to prevent hanging indefinitely
      const dbPromise = connectDB(env.MONGO_URI);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database connection timed out (15s limit)')), 15000)
      );
      await Promise.race([dbPromise, timeoutPromise]);
      console.log('Database connected successfully');
    } else {
      throw new Error("MONGO_URI is missing");
    }

    // 4. Find or Create User
    let user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      // Create new user with random password (since they use Google)
      const randomPassword = crypto.randomBytes(16).toString('hex');
      user = await User.create({
        name: userInfo.name || 'Google User',
        email: normalizedEmail,
        password: randomPassword,
        isMfaEnabled: true // Enforce MFA for Google users
      });
    }

    // 5. Generate Real MFA Code
    const mfaCode = Math.floor(100000 + Math.random() * 900000).toString();
    const mfaSecret = crypto.randomBytes(32).toString('hex'); // For internal verification if needed

    // 6. Save Code to DB
    user.mfaEmailCode = mfaCode;
    user.mfaEmailExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    user.mfaSecret = mfaSecret;
    await user.save();

    // 7. Send Email (Resend or Simulation)
    const emailSubject = 'Your Nova Wealth Verification Code';
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Verify your identity</h2>
        <p>Your verification code is:</p>
        <h1 style="color: #D4AF37; letter-spacing: 5px;">${mfaCode}</h1>
        <p>This code will expire in 10 minutes.</p>
      </div>
    `;

    await sendEmail(normalizedEmail, emailSubject, emailHtml, env);

    // 8. Redirect back to Frontend
    // Determine frontend URL (use env var or state, fallback to localhost)
    let frontendCallback = state ? decodeURIComponent(state) : `${env.FRONTEND_URL || 'http://localhost:5173'}/oauth/callback`;
    
    // Fix: If running locally via proxy, ensure we redirect to the right port or let frontend handle it
    // The previous frontend change forces API calls to 127.0.0.1:8788, but the browser redirect needs to go to the Frontend Server (5173 usually)
    // The 'state' param usually holds the frontend URL.
    
    const redirectUrl = new URL(frontendCallback);
    redirectUrl.searchParams.set('email', normalizedEmail);
    redirectUrl.searchParams.set('mfaRequired', 'true');
    
    return Response.redirect(redirectUrl.toString(), 302);

  } catch (error) {
    console.error('Callback Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
