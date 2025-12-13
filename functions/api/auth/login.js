import User from '../../models/User.js';
import generateToken from '../../utils/generateToken.js';
import { connectDB } from '../../utils/db.js';
import { sendEmail } from '../../utils/email.js';

export const onRequestPost = async (context) => {
  const { request, env } = context;

  try {
    // Connect to DB
    if (env.MONGO_URI) {
      const dbPromise = connectDB(env.MONGO_URI);
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database connection timed out')), 15000)
      );
      await Promise.race([dbPromise, timeoutPromise]);
    }

    const { email, password } = await request.json();
    const normalizedEmail = String(email || '').toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });

    if (user && (await user.matchPassword(password))) {
      if (user.isMfaEnabled) {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        user.mfaEmailCode = code;
        user.mfaEmailExpires = new Date(Date.now() + 10 * 60 * 1000);
        await user.save();

        let sent = false;
        const emailSubject = 'Your Nova Wealth login code';
        const emailHtml = `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Verify your login</h2>
            <p>Your login verification code is:</p>
            <h1 style="color: #D4AF37; letter-spacing: 5px;">${code}</h1>
            <p>This code will expire in 10 minutes.</p>
          </div>
        `;

        try {
          const result = await sendEmail(user.email, emailSubject, emailHtml, env);
          sent = !!(result && result.success && !result.simulated);
        } catch (e) {
          console.error('Email send failed:', e);
          sent = false;
        }

        return new Response(JSON.stringify({ 
            _id: user._id, 
            email: user.email, 
            mfaRequired: true, 
            devCode: sent ? undefined : code 
        }));
      } else {
        return new Response(JSON.stringify({
          _id: user._id,
          name: user.name,
          email: user.email,
          isMfaEnabled: user.isMfaEnabled,
          token: generateToken(user._id, env.JWT_SECRET),
        }));
      }
    } else {
      return new Response(JSON.stringify({ message: 'Invalid email or password' }), { status: 401 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
};
